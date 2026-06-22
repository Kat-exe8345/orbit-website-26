export const CHARS = " ... ... . . :::=+xX#0369";
export const DPR = 2;
export const FONT_SIZE = 10;
export const ASCII_COLS = 50;
export const SCRAMBLE_COUNT = 5;
export const SCRAMBLE_SPEED_MS = 100;
export const CELL_APPEAR_MS = 1.25;
export const REVEAL_DELAY_MS = 0;

export type ASCIIImageConfig = {
  chars: string;
  dpr: number;
  fontSize: number;
  asciiCols: number;
  scrambleCount: number;
  scrambleSpeedMs: number;
  cellAppearMs: number;
  revealDelayMs: number;
};

export const DEFAULT_ASCII_IMAGE_CONFIG: ASCIIImageConfig = {
  chars: CHARS,
  dpr: DPR,
  fontSize: FONT_SIZE,
  asciiCols: ASCII_COLS,
  scrambleCount: SCRAMBLE_COUNT,
  scrambleSpeedMs: SCRAMBLE_SPEED_MS,
  cellAppearMs: CELL_APPEAR_MS,
  revealDelayMs: REVEAL_DELAY_MS,
};

export function getASCIIMetrics(
  width: number,
  height: number,
  fontSize: number,
  asciiCols: number,
) {
  if (!width || !height) {
    return {
      ASCII_ROWS: 0,
      CHAR_WIDTH: 0,
      CHAR_HEIGHT: 0,
    };
  }

  return {
    ASCII_ROWS: Math.max(1, Math.ceil(height / fontSize)),
    CHAR_WIDTH: width / asciiCols,
    CHAR_HEIGHT: fontSize,
  };
}

export function imgToASCII(
  img: HTMLImageElement,
  ASCII_ROWS: number,
  itemWidth: number,
  itemHeight: number,
  chars: string,
  asciiCols: number,
) {
  const imageAspect = img.naturalWidth / img.naturalHeight;
  const itemAspect = itemWidth / itemHeight;

  let cropX = 0;
  let cropY = 0;
  let cropW = img.naturalWidth;
  let cropH = img.naturalHeight;

  if (imageAspect > itemAspect) {
    cropW = img.naturalHeight * itemAspect;
    cropX = (img.naturalWidth - cropW) / 2;
  } else {
    cropH = img.naturalWidth / itemAspect;
    cropY = (img.naturalHeight - cropH) / 2;
  }

  const samplingCanvas = document.createElement("canvas");
  samplingCanvas.width = asciiCols;
  samplingCanvas.height = ASCII_ROWS;

  const ctx = samplingCanvas.getContext("2d");
  if (!ctx) return null;

  ctx.drawImage(img, cropX, cropY, cropW, cropH, 0, 0, asciiCols, ASCII_ROWS);

  const imageData = ctx.getImageData(0, 0, asciiCols, ASCII_ROWS);
  const { data } = imageData;

  for (let i = 0; i < data.length; i += 4) {
    const grayscale = Math.round(
      data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114,
    );

    data[i] = grayscale;
    data[i + 1] = grayscale;
    data[i + 2] = grayscale;
  }

  ctx.putImageData(imageData, 0, 0);

  const ASCII_GRID: string[][] = [];
  const BRIGHTNESS_GRID: number[][] = [];

  for (let row = 0; row < ASCII_ROWS; row++) {
    const asciiRow: string[] = [];
    const brightnessRow: number[] = [];

    for (let col = 0; col < asciiCols; col++) {
      const pixelIndex = (row * asciiCols + col) * 4;

      const brightness =
        (data[pixelIndex] * 0.299 +
          data[pixelIndex + 1] * 0.587 +
          data[pixelIndex + 2] * 0.114) /
        255;

      const charIndex = Math.min(
        chars.length - 1,
        Math.floor((1 - brightness) * (chars.length - 1)),
      );

      asciiRow.push(chars[charIndex]);
      brightnessRow.push(charIndex);
    }

    ASCII_GRID.push(asciiRow);
    BRIGHTNESS_GRID.push(brightnessRow);
  }

  return {
    ASCII_GRID,
    BRIGHTNESS_GRID,
  };
}

export function prepCanvas(
  canvas: HTMLCanvasElement,
  width: number,
  height: number,
  dpr: number,
) {
  canvas.width = Math.round(width * dpr);
  canvas.height = Math.round(height * dpr);

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#111";
  ctx.fillRect(0, 0, width, height);
}

function drawChar(
  ctx: CanvasRenderingContext2D,
  col: number,
  row: number,
  char: string,
  CHAR_WIDTH: number,
  CHAR_HEIGHT: number,
) {
  ctx.fillStyle = "#111";
  ctx.fillRect(col * CHAR_WIDTH, row * CHAR_HEIGHT, CHAR_WIDTH, CHAR_HEIGHT);
  ctx.fillStyle = "#c8c8c8";
  ctx.fillText(char, col * CHAR_WIDTH, row * CHAR_HEIGHT);
}

function shuffleArray(array: number[]) {
  const copy = [...array];

  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
}

function scheduleImgReveal(canvas: HTMLCanvasElement, revealDelayMs: number) {
  setTimeout(() => {
    canvas.closest(".img")?.classList.add("revealed");
  }, revealDelayMs);
}

export function animateASCII(
  canvas: HTMLCanvasElement,
  ASCII_GRID: string[][],
  BRIGHTNESS_GRID: number[][],
  ASCII_ROWS: number,
  CHAR_WIDTH: number,
  CHAR_HEIGHT: number,
  staggerDelay: number,
  config: ASCIIImageConfig,
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.font = `${config.fontSize}px JetBrains Mono`;
  ctx.textBaseline = "top";

  const denseCharIndex = config.chars.lastIndexOf(".");
  const denseChars =
    denseCharIndex >= 0
      ? config.chars.slice(denseCharIndex + 1).split("")
      : config.chars.split("");
  const totalCells = ASCII_ROWS * config.asciiCols;
  const scrambleState = new Array(totalCells).fill(null);

  let settledCount = 0;

  const cellOrder = shuffleArray(
    Array.from({ length: totalCells }, (_, i) => i),
  );

  cellOrder.forEach((cellIndex, orderIndex) => {
    setTimeout(
      () => {
        const row = Math.floor(cellIndex / config.asciiCols);
        const col = cellIndex % config.asciiCols;

        const isDark = BRIGHTNESS_GRID[row][col] > denseCharIndex;

        if (!isDark) {
          drawChar(
            ctx,
            col,
            row,
            ASCII_GRID[row][col],
            CHAR_WIDTH,
            CHAR_HEIGHT,
          );
          scrambleState[cellIndex] = 0;
          settledCount++;
          return;
        }

        drawChar(
          ctx,
          col,
          row,
          denseChars[Math.floor(Math.random() * denseChars.length)],
          CHAR_WIDTH,
          CHAR_HEIGHT,
        );

        scrambleState[cellIndex] = config.scrambleCount;
      },
      staggerDelay + orderIndex * config.cellAppearMs,
    );
  });

  const interval = setInterval(() => {
    let active = false;

    for (let cellIndex = 0; cellIndex < totalCells; cellIndex++) {
      const remaining = scrambleState[cellIndex];

      if (remaining === null || remaining === 0) {
        continue;
      }

      active = true;

      const row = Math.floor(cellIndex / config.asciiCols);
      const col = cellIndex % config.asciiCols;

      if (remaining === 1) {
        drawChar(ctx, col, row, ASCII_GRID[row][col], CHAR_WIDTH, CHAR_HEIGHT);
        scrambleState[cellIndex] = 0;
        settledCount++;

        if (settledCount === totalCells) {
          scheduleImgReveal(canvas, config.revealDelayMs);
        }
      } else {
        drawChar(
          ctx,
          col,
          row,
          denseChars[Math.floor(Math.random() * denseChars.length)],
          CHAR_WIDTH,
          CHAR_HEIGHT,
        );

        scrambleState[cellIndex] = remaining - 1;
      }
    }

    if (!active) {
      clearInterval(interval);
    }
  }, config.scrambleSpeedMs);
}

export function startEffect(
  img: HTMLImageElement,
  canvas: HTMLCanvasElement,
  width: number,
  height: number,
  staggerDelay: number,
  ASCII_ROWS: number,
  CHAR_WIDTH: number,
  CHAR_HEIGHT: number,
  config: ASCIIImageConfig,
) {
  const result = imgToASCII(
    img,
    ASCII_ROWS,
    width,
    height,
    config.chars,
    config.asciiCols,
  );
  if (!result) return;

  prepCanvas(canvas, width, height, config.dpr);

  animateASCII(
    canvas,
    result.ASCII_GRID,
    result.BRIGHTNESS_GRID,
    ASCII_ROWS,
    CHAR_WIDTH,
    CHAR_HEIGHT,
    staggerDelay,
    config,
  );
}
