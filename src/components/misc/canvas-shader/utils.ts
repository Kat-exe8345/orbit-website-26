const CHARS = "'^\" . ,-_+*oaM#%@";
const DPR = 2;
const FONT_SIZE = 10;
const ASCII_COLS = 50;
const REVEAL_DELAY_MS = 50;

export function getASCIIMetrics(width: number, height: number) {
  if (!width || !height) {
    return {
      asciiRows: 0,
      charWidth: 0,
      charHeight: 0,
    };
  }

  return {
    asciiRows: Math.max(1, Math.ceil(height / FONT_SIZE)),
    charWidth: width / ASCII_COLS,
    charHeight: FONT_SIZE,
  };
}

export function imgToASCII(
  img: HTMLImageElement,
  itemWidth: number,
  itemHeight: number,
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
  samplingCanvas.width = ASCII_COLS;
  samplingCanvas.height = Math.max(1, Math.ceil(itemHeight / FONT_SIZE));

  const ctx = samplingCanvas.getContext("2d");
  if (!ctx) return null;

  ctx.drawImage(
    img,
    cropX,
    cropY,
    cropW,
    cropH,
    0,
    0,
    ASCII_COLS,
    samplingCanvas.height,
  );

  const imageData = ctx.getImageData(0, 0, ASCII_COLS, samplingCanvas.height);
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

  const asciiGrid: string[][] = [];
  const brightnessGrid: number[][] = [];

  for (let row = 0; row < samplingCanvas.height; row++) {
    const asciiRow: string[] = [];
    const brightnessRow: number[] = [];

    for (let col = 0; col < ASCII_COLS; col++) {
      const pixelIndex = (row * ASCII_COLS + col) * 4;

      const brightness =
        (data[pixelIndex] * 0.299 +
          data[pixelIndex + 1] * 0.587 +
          data[pixelIndex + 2] * 0.114) /
        255;

      const charIndex = Math.min(
        CHARS.length - 1,
        Math.floor((1 - brightness) * (CHARS.length - 1)),
      );

      asciiRow.push(CHARS[charIndex]);
      brightnessRow.push(charIndex);
    }

    asciiGrid.push(asciiRow);
    brightnessGrid.push(brightnessRow);
  }

  return {
    asciiGrid,
    brightnessGrid,
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
  asciiGrid: string[][],
  brightnessGrid: number[][],
  charWidth: number,
  charHeight: number,
  staggerDelay: number,
  scrambleCount: number,
  scrambleSpeedMs: number,
  cellAppearMs: number,
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.font = `${FONT_SIZE}px JetBrains Mono`;
  ctx.textBaseline = "top";

  const denseCharIndex = CHARS.lastIndexOf(".");
  const denseChars =
    denseCharIndex >= 0
      ? CHARS.slice(denseCharIndex + 1).split("")
      : CHARS.split("");
  const asciiCols = ASCII_COLS;
  const asciiRows = asciiGrid.length;
  const totalCells = asciiRows * asciiCols;
  const scrambleState = new Array(totalCells).fill(null);

  let settledCount = 0;

  const cellOrder = shuffleArray(
    Array.from({ length: totalCells }, (_, i) => i),
  );

  cellOrder.forEach((cellIndex, orderIndex) => {
    setTimeout(
      () => {
        const row = Math.floor(cellIndex / asciiCols);
        const col = cellIndex % asciiCols;

        const isDark = brightnessGrid[row][col] > denseCharIndex;

        if (!isDark) {
          drawChar(ctx, col, row, asciiGrid[row][col], charWidth, charHeight);
          scrambleState[cellIndex] = 0;
          settledCount++;
          return;
        }

        drawChar(
          ctx,
          col,
          row,
          denseChars[Math.floor(Math.random() * denseChars.length)],
          charWidth,
          charHeight,
        );

        scrambleState[cellIndex] = scrambleCount;
      },
      staggerDelay + orderIndex * cellAppearMs,
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

      const row = Math.floor(cellIndex / asciiCols);
      const col = cellIndex % asciiCols;

      if (remaining === 1) {
        drawChar(ctx, col, row, asciiGrid[row][col], charWidth, charHeight);
        scrambleState[cellIndex] = 0;
        settledCount++;

        if (settledCount === totalCells) {
          scheduleImgReveal(canvas, REVEAL_DELAY_MS);
        }
      } else {
        drawChar(
          ctx,
          col,
          row,
          denseChars[Math.floor(Math.random() * denseChars.length)],
          charWidth,
          charHeight,
        );

        scrambleState[cellIndex] = remaining - 1;
      }
    }

    if (!active) {
      clearInterval(interval);
    }
  }, scrambleSpeedMs);
}

export function startEffect(
  img: HTMLImageElement,
  canvas: HTMLCanvasElement,
  width: number,
  height: number,
  staggerDelay: number,
  scrambleCount: number,
  scrambleSpeedMs: number,
  cellAppearMs: number,
) {
  const result = imgToASCII(img, width, height);
  if (!result) return;

  prepCanvas(canvas, width, height, DPR);

  animateASCII(
    canvas,
    result.asciiGrid,
    result.brightnessGrid,
    width / ASCII_COLS,
    FONT_SIZE,
    staggerDelay,
    scrambleCount,
    scrambleSpeedMs,
    cellAppearMs,
  );
}
