import Link from "next/link";

export default function PaymentForm() {
  return (
    <form>
      <h4>Make Payment</h4>
      <Link href="/" passHref>
        <button>Back</button>
      </Link>
    </form>
  );
}
