const X = 0;
const Y = 1;
const Z = 2;

const ROTATION_X = "x";
const ROTATION_Y = "y";
const ROTATION_Z = "z";

const BLACK = [0, 0, 0];
const WHITE = [255, 255, 255];
const RED = [255, 0, 0];
const GREEN = [0, 255, 0];
const BLUE = [0, 0, 255];
const YELLOW = [255, 255, 0];
const MAGENTA = [255, 0, 255];
const CYAN = [0, 255, 255];
const OLIVE = [128, 128, 0];
const PURPLE = [128, 0, 128];
const TEAL = [0, 128, 128];
const GRAY = [128, 128, 128];

const LIGHT_SOURCE_TYPE = "LS";
const SPHERE_TYPE = "SP";
const PLANE_TYPE = "PL";

const MAX_DEPTH = 2;

const PI = Math.PI;

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var WIDTH = canvas.width;
var HEIGHT = canvas.height;

const clearScreen = () => ctx.clearRect(0, 0, WIDTH, HEIGHT);

const sin = (deg) => math.sin((deg * PI) / 180);
const cos = (deg) => math.cos((deg * PI) / 180);

const getVectorLength = (vector) =>
  math.sqrt(
    vector[X] * vector[X] + vector[Y] * vector[Y] + vector[Z] * vector[Z]
  );

const getUnitVector = (vector) => {
  var len = getVectorLength(vector);
  return [vector[X] / len, vector[Y] / len, vector[Z] / len];
};

const isValidColor = (rgb) => {
  if (rgb < 0) return 0;
  else if (rgb > 255) return 255;
  else return rgb;
};

const colorValidation = (color) => [
  isValidColor(color[X]),
  isValidColor(color[Y]),
  isValidColor(color[Z]),
];

const rgbToHex = (rgb) => {
  var hex = Number(parseInt(rgb)).toString(16);
  if (hex.length < 2) {
    hex = "0" + hex;
  }
  return hex;
};

const hexToRGB = (hex) => {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  return result !== null
    ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16),
      ]
    : false;
};
