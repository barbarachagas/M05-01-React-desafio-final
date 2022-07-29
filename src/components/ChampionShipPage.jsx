import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiGetChampionShipData } from "../api/api";
import helperGetTeamImageName from "../helpers/helper";

export default function ChampionShipPage() {
  const { pathname } = useLocation();
  const year = Number(pathname.substring(1));
  const [championShipData, setChampionShipData] = useState(null);

  useEffect(() => {
    async function getChampionShipDataFromBackend() {
      const backendData = await apiGetChampionShipData(year);
      setChampionShipData(backendData);
    }
    getChampionShipDataFromBackend();
  }, [year]);

  if (!championShipData) {
    return <p>Carregando...</p>;
  }

  return (
    <>
      <h2 className="font-semibold my-4 text-center text-xl">
        Campeonato brasileiro de {year}
      </h2>
      <h3 className="font-semibold my-4 text-center text-lg">Classificação</h3>
      <table>
        <thead>
          <tr>
            <th className="w-10"></th>
            <th className="w-10"></th>
            <th className="w-48"></th>
            <th className="w-10">P</th>
            <th className="w-10">V</th>
            <th className="w-10">E</th>
            <th className="w-10">D</th>
            <th className="w-10">GP</th>
            <th className="w-10">GC</th>
            <th className="w-10">SG</th>
          </tr>
        </thead>
        <tbody>
          {championShipData.map((team, index) => {
            const {
              balance,
              defeats,
              draws,
              victories,
              scoredGoals,
              takenGoals,
              points,
              teamName,
            } = team;
            const ranking = (index + 1).toString().padStart(2, "0");
            return (
              <tr className="text-center" key={index}>
                <td>{ranking}</td>
                <td>
                  <img
                    width="25px"
                    height="25px"
                    src={`/img/${helperGetTeamImageName(teamName)}.png`}
                  />
                </td>
                <td className="text-left">{teamName}</td>
                <td>{points}</td>
                <td>{victories}</td>
                <td>{draws}</td>
                <td>{defeats}</td>
                <td>{scoredGoals}</td>
                <td>{takenGoals}</td>
                <td>{balance}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
