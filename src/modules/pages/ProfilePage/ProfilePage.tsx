import { Boxes } from "./components/Boxes/Boxes";
import { SignatureInfo } from "./components/SignatureInfo/SignatureInfo";

export function ProfilePage() {
  return (
    <section className="space-y-10">
      <div>
        <h1 className="text-center text-4xl font-bold">Perfil</h1>
        <p className="text-center">Informações do seu perfil</p>
      </div>

      <SignatureInfo />

      <Boxes />
    </section>
  );
}
