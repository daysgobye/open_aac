export class SpeachSynth {
  synth: SpeechSynthesis;
  voice: SpeechSynthesisVoice;
  pitch: number = 1;
  rate: number = 1;
  volume: number = 1;
  constructor() {
    if ("speechSynthesis" in window) {
      this.synth = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance();
      if (utterance.voice) {
        this.voice = utterance.voice;
      } else {
        this.voice = this.listVoices()[0];
      }
    } else {
      throw new Error("browser not supported");
    }
  }
  speak(text: string) {
    const utterance = new SpeechSynthesisUtterance();
    utterance.text = text;
    utterance.voice = this.voice;
    utterance.pitch = this.pitch;
    utterance.rate = this.rate;
    utterance.volume = this.volume;
    this.synth.speak(utterance);
  }
  listVoices() {
    const langRegex = /^en(-[a-z]{2})?$/i;
    return this.synth.getVoices().filter((voice) => langRegex.test(voice.lang));
  }
  setVoice(voice: SpeechSynthesisVoice) {
    this.voice = voice;
  }
  stop() {
    this.synth.cancel();
  }
  pause() {
    this.synth.pause();
  }
  play() {
    this.synth.resume();
  }
}
