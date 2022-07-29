export default function helperGetTeamImageName(teamName) {
  return teamName
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase()
    .replace(" ", "_");
}
