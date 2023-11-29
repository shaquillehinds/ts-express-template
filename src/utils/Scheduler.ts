const { EventEmitter } = require("events");

export class Schedule extends EventEmitter {
  handle?: NodeJS.Timeout;
  action: CallableFunction;
  time: number;
  constructor(action: CallableFunction, time: number) {
    super();
    this.handle = undefined;
    this.action = action;
    this.time = time;
    this.on("interval", action);
  }
  start(): void {
    if (!this.handle) {
      this.handle = setInterval(() => {
        this.emit("interval");
      }, this.time);
    }
  }
  stop(): void {
    if (this.handle) {
      clearInterval(this.handle);
      this.handle = undefined;
    }
  }
}

export class Timer extends EventEmitter {
  handle?: NodeJS.Timeout;
  action: CallableFunction;
  time: number;
  speaker?: { roomID?: string };
  roomID?: string;
  constructor(
    action: CallableFunction,
    time: number,
    speaker?: { roomID?: string },
    roomID?: string
  ) {
    super();
    this.handle = undefined;
    this.action = action;
    this.time = time;
    this.speaker = speaker;
    this.roomID = roomID;
    this.on("timeout", action);
  }
  start(): void {
    if (!this.handle) {
      this.handle = setTimeout(() => {
        this.emit("timeout");
        this.stop();
      }, this.time);
    }
  }
  stop(): void {
    if (this.handle) {
      clearTimeout(this.handle);
      this.handle = undefined;
    }
  }
}
module.exports = { Schedule, Timer };
