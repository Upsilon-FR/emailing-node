export default class ClassCtrl {
  //Vérification de l'intégrité des données reçues
  static verif = (dataIpt: Array<string>, dataVerif: Object) => {
    let listError: any[] = [];
    //Vérification que le body est correctement rempli
    dataIpt.forEach((val) => {
      if (!Object.keys(dataVerif).includes(val)) {
        listError.push(`Champ ${val} manquant`);
      }
    });

    //Vérification que le body est correctement rempli
    Object.entries(dataVerif).forEach(([key, value]) => {
      if ((!value || value === "") && dataIpt.includes(key)) {
        listError.push(`Champ ${key} vide`);
      } else if (((!value || value === "") && !dataIpt.includes(key)) || !dataIpt.includes(key)) {
        listError.push(`Champ ${key} non autorisé`);
      }
    });
    return listError;
  };
}
