const COLORS = {
  BLACK: '#000000',
  BOARD: '#E3A865',
  BORDER: '#583C14',
  GRAY: '#eeeeee',
  HIGHLIGHT: '#ffff00',
  WHITE: '#ffffff',
  TILE: '#936D36',
  PATH: '#FCE8B8',
};

const styles = `
  .avatar, .border, .port {
    stroke: ${COLORS.BORDER};
    stroke-width: 1;
  }

  .avatar__highlight {
    fill: ${COLORS.BOARD};
    stroke: ${COLORS.BOARD};
    stroke-width: 7;
  }

  .avatar__shadow {
    fill: ${COLORS.PATH};
    stroke: ${COLORS.PATH};
    stroke-width: 5;
  }

  .background {
    fill: ${COLORS.WHITE};
  }

  .border {
    fill: none;
  }

  .dead {
    opacity: 0.5;
  }

  .port {
    fill: ${COLORS.WHITE};
  }

  .path {
    fill: none;
    stroke: ${COLORS.PATH};
    stroke-width: 3;
  }

  .path__shadow {
    fill: none;
    opacity: 0.5;
    stroke: ${COLORS.BORDER};
    stroke-width: 7;
  }

  .tile__highlight {
    fill: ${COLORS.HIGHLIGHT};
    stroke: ${COLORS.HIGHLIGHT};
    stroke-width: 7;
    opacity: 0.3;
  }

  .tile-bg {
    fill: ${COLORS.TILE};
  }

  .tile-bg--empty {
    fill: ${COLORS.BOARD};
  }

  .text {
    fill: ${COLORS.BLACK};
    font-family: 'Helvetica', sans-serif;
    font-size: 20;
  }

  .bold {
    font-weight: 600;
  }
`;

module.exports = styles;
