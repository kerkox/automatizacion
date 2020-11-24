export interface TanqueDimension {
  left: Dimension,
  center: Dimension,
  right: Dimension,
  bottom: Dimension
}

export interface Dimension {
  posX: number,
  posY: number,
  width: number,
  height: number
}