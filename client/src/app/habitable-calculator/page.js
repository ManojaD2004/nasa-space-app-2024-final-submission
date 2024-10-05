import Calculator from "./components/Calculator";
import Herosection from "./components/Herosection";

import { BackgroundGradientDemo } from "./components/Info";

export default function Home() {
  const backEndLink =
    process.env.BACKEND_SERVER_LINK || "http://localhost:5000";
  // console.log(backEndLink);
  return (
    <div>
      <Herosection />
      <Calculator backEndLink={backEndLink} />
      <BackgroundGradientDemo />
    </div>
  );
}
