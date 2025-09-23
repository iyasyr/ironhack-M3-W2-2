// src/pages/HobbiesPage.tsx
import Hobbies from "../components/HobbiesList";
import { hobbiesData } from "../data/hobbies"; // or inline the array

export default function HobbiesPage() {
  return (
    <main className="container">
      <h1 className="pageHeader">Hobbies</h1>
      <Hobbies items={hobbiesData} />
    </main>
  );
}
