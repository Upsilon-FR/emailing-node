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

    //Vérification que les données sont correctement remplies
    Object.entries(dataVerif).forEach(([key, value]) => {
      if ((!value || value === "") && dataIpt.includes(key)) {
        listError.push(`Champ ${key} vide`);
      } else if (((!value || value === "") && !dataIpt.includes(key)) || !dataIpt.includes(key)) {
        listError.push(`Champ ${key} non autorisé`);
      }
    });
    return listError;
  };

  //Vérification de l'intégrité des données optionnelles reçues avec possibilité d'avoir moins 1 des champs requis
  static verifWithOption = (dataIpt: Array<string>, dataToVerif: Object, OneAtLeast: Boolean = false) => {
    let listOption: any[] = [];

    dataIpt.forEach((val) => {
      if (Object.keys(dataToVerif).includes(val)) {
        listOption.push(val);
      }
    });

    let result: any[] = [];
    if (listOption.length > 0) result = this.verif(listOption, dataToVerif);
    else if (listOption.length === 0 && OneAtLeast) {
      let response = "Au moins 1 des champs suivant est requis : ";
      result.push(response.concat(dataIpt.join(", ")));
    }

    return result;
  };
}
