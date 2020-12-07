export class Product {
  public name: string;
  public price: string;
  public description: string;
  public imagePath: string;

  constructor(name: string, price: string, description: string, imagePath: string) {
    this.name = name;
    this.price = price;
    this.description = description;
    this.imagePath = imagePath;
  }
}