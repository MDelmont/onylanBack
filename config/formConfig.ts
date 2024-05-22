export const constFormulaire = {
    regexEmail:/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
    passwordSize: 6,
    majRegex: /^(?=.*[A-Z])/, // Le mot de passe doit contenir au moins une lettre majuscule.
    minRegex: /^(?=.*[a-z])/, // Le mot de passe doit contenir au moins une lettre minuscule.
    digitRegex: /^(?=.*\d)/, // Vérifie la présence d'au moins un chiffre.
    specialCharRegex: /^(?=.*[@$!%*?&])/, // Vérifie la présence d'au moins un caractère spécial parmi @$!%*?&.
};

export const messageErrors = {
    regexEmail: { invalid: "l'adresse email est invalide", valid: "l'adresse email est valide" },
    passwordSize: { invalid: `La longueur minimale du mot de passe est de ${constFormulaire.passwordSize} caractères`, valid: "La longueur du mot de passe est valide" },
    majRegex: { invalid: "Le mot de passe doit contenir au moins une lettre majuscule", valid: "Le mot de passe contient au moins une lettre majuscule" },
    minRegex: { invalid: "Le mot de passe doit contenir au moins une lettre minuscule", valid: "Le mot de passe contient au moins une lettre minuscule" },
    digitRegex: { invalid: "Le mot de passe doit contenir au moins un chiffre", valid: "Le mot de passe contient au moins un chiffre" },
    specialCharRegex: { invalid: "Le mot de passe doit contenir au moins un caractère spécial parmi @$!%*?&", valid: "Le mot de passe contient au moins un caractère spécial parmi @$!%*?&" },
    samePassword: { invalid: "Les mots de passe ne correspondent pas", valid: "Les mots de passe correspondent" }
};