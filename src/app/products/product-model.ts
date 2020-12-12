export class Product {
  public vinylFigureId: number;
  public name: string;
  public price: number;
  public description: string;
  public imagePath: string;

  constructor(vinylFigureId: number, name: string, price: number, description: string, imagePath: string) {
    this.vinylFigureId = vinylFigureId;
    this.name = name;
    this.price = price;
    this.description = description;
    this.imagePath = imagePath;
  }
}