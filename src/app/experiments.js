import { Component, html, Injectable } from '../lib';

@Injectable()
class ExpService {
  getText() {
    return 'hello all';
  }
}

@Component({ selector: 'app-experiments', deps: [ExpService] })
class Experiments {
  constructor(expService) {}
  render() {
    return html`${this.expService.getText()}`;
  }
}
