import chefLogo from "../assets/chef.png";

export default function Header() {
  return (
    <header>
      <img src={chefLogo} />
      <h1>Chef Claude</h1>
    </header>
  );
}
