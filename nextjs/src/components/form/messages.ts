const EN_MESSAGE = {
  required: "This field is required.",
  email: "Please enter a valid email address.",
  min: "This field must be at least ${min} characters long.",
  max: "This field must be at most ${max} characters long.",
  oneOf: "This field must be one of the following values: ${values}.",
  privacyPolicy: "You must accept the privacy policy.",
}

export default {
  "de-DE": {
    required: "Dieses Feld muss ausgefüllt werden.",
    email: "Bitte geben Sie eine gültige E-Mail-Adresse ein.",
    min: "Dieses Feld muss mindestens ${min} Zeichen lang sein.",
    max: "Dieses Feld darf höchstens ${max} Zeichen lang sein.",
    oneOf: "Dieses Feld muss einen der folgenden Werte enthalten: ${values}.",
    privacyPolicy: "Sie müssen die Datenschutzrichtlinie akzeptieren.",
  },
  "de-CH": {
    required: "Dieses Feld muss ausgefüllt werden.",
    email: "Bitte geben Sie eine gültige E-Mail-Adresse ein.",
    min: "Dieses Feld muss mindestens ${min} Zeichen lang sein.",
    max: "Dieses Feld darf höchstens ${max} Zeichen lang sein.",
    oneOf: "Dieses Feld muss einen der folgenden Werte enthalten: ${values}.",
    privacyPolicy: "Sie müssen die Datenschutzrichtlinie akzeptieren.",
  },
  "nl-NL": {
    required: "Dit veld is verplicht.",
    email: "Voer een geldig e-mailadres in.",
    min: "Dit veld moet minimaal ${min} tekens lang zijn.",
    max: "Dit veld mag maximaal ${max} tekens lang zijn.",
    oneOf: "Dit veld moet een van de volgende waarden zijn: ${values}.",
    privacyPolicy: "U moet het privacybeleid accepteren.",
  },
  "en-AU": EN_MESSAGE,
  en: EN_MESSAGE,
} as const
