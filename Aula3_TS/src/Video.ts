interface IProps {
  width: number;
  height: number;
  message: string;
}

interface sourceElements {
  src: string;
  type: string;
}

class CustomPlayer {
  width: number;
  height: number;
  message: string;
  sources: sourceElements[];

  constructor({ width, height, message }: IProps) {
    this.width = width || 400;
    this.height = height || 200;
    this.message = message || "Your browser does not support the video tag";
    this.sources = [];
  }

  setSources(sources: sourceElements[]) {
    this.sources = sources;
  }

  renderSourceElements() {
    return this.sources.map((element) => {
      const { src, type } = element;

      return `<source src="${src}" type="${type}">`;
    });
  }

  render(id: string) {
    return `
        <section id="${id}">
          <video width="${this.width}" height="${this.height}" controls>
              ${this.renderSourceElements()}
              ${this.message}
          </video>
        </section>
      `;
  }
}

export default CustomPlayer;
