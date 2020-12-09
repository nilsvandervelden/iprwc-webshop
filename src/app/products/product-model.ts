export class Product {
  public id: number;
  public name: string;
  public price: string;
  public description: string;
  public imagePath: string;

  constructor(id: number, name: string, price: string, description: string, imagePath: string) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.description = description;
    this.imagePath = imagePath;
  }
}