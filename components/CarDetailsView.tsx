import Image from "next/image";
import formatPrice from "../utils/formatPrice";

interface Props {
  car: {
    name: string;
    image: string;
    price: number;
  };
}

export default function CarDetailsView({ car }: Props) {
  return (
    <div className="car-details">
      <Image
        alt={car.name}
        src={car.image}
        height={600}
        width={1000}
        layout="responsive"
      />
      <h4>{car.name}</h4>
      <h4>Price: {formatPrice(car.price)}</h4>
    </div>
  );
}
