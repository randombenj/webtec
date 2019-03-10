WEBTEC = {}

WEBTEC.artist = {
  canvas: false,
  context: false,
  flag: false,
  showText: true,
  currentPositoin: { x: 0, y: 0 },
  previousPosition: { x: 0, y: 0 },
  dotFlag: false,
  color: 'black',
  b: 2,
  init() {
    this.canvas = document.getElementById('canvas');
    this.context = this.canvas.getContext("2d");

    this.context.font = "20px Arial";
    this.displayText();
  
    this.canvas.addEventListener("mousemove", (e) => this.findxy('move', e), false);
    this.canvas.addEventListener("mouseup", (e) => this.findxy('up', e), false);
    this.canvas.addEventListener("mousedown", (e) => this.findxy('down', e), false);
    this.canvas.addEventListener("mouseout", (e) => this.findxy('out', e), false);
  },
  setColor(obj) {
    this.color = obj.id;
  },
  draw() {
    this.context.beginPath();
    this.context.moveTo(this.previousPosition.x, this.previousPosition.y);
    this.context.lineTo(this.currentPositoin.x, this.currentPositoin.y);
    this.context.strokeStyle = this.color;
    this.context.lineWidth = this.b;
    this.context.stroke();
    this.context.closePath();
  },
  erase() {
    if (confirm("Want to clear?")) {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.displayText();
    }
  },
  displayText() {
    this.context.fillStyle = 'black';
    this.context.fillText("Start drawing here ...", 400, 200);
    this.context.fillStyle = this.color;
    this.showText = true;
  },
  findxy(res, e) {
    const setPositions = () => {
      const rect = canvas.getBoundingClientRect();
      this.previousPosition.x = this.currentPositoin.x;
      this.previousPosition.y = this.currentPositoin.y;
      this.currentPositoin.x = e.clientX - rect.left;
      this.currentPositoin.y = e.clientY - rect.top;
    }
    const clearText = () => {
      if (this.showText) {
        // clear the text when drawing the first time
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.showText = false;
      }
    }
    if (res == 'down') {
      setPositions();
      this.flag = true;
      this.dotFlag = true;
      if (this.dotFlag) {
        clearText();
        this.context.beginPath();
        this.context.fillStyle = this.color;
        this.context.fillRect(this.currentPositoin.x, this.currentPositoin.y, 2, 2);
        this.context.closePath();
        this.dotFlag = false;
      }
    }
    if (res == 'up' || res == "out") {
      this.flag = false;
    }
    if (res == 'move') {
      if (this.flag) {
        setPositions();
        clearText();
        this.draw();
      }
    }
  }
}

WEBTEC.invertColor = () => {
  let inverted = document.cookie.match('(^|;) ?inverted=([^;]*)(;|$)');
  inverted = inverted ? (inverted[2] == 'true') : false;
  let value = inverted ? '0' : '100';
  document.cookie = `inverted=${!inverted}`;
  $('body').css('filter', `invert(${value}%)`);
}