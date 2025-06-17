import { Field } from "@strapi/design-system";
import * as React from "react";
import { unstable_useContentManagerContext as useContentManagerContext } from "@strapi/strapi/admin";
import {useEffect, useMemo} from 'react'

type InputProps = {
  attribute: {
    type: string;
    customField: string,
    options: {
      pattern: string,
      override: string,
    }
  };
  name: string;
  label: any;
  labelAction?: any;
  onChange: (event: { target: { name: string; type: string; value: unknown } }) => void;
  value: unknown;
  required?: boolean;
  error?: any;
};

type Locale =
  'nl' | 'nl-NL' |
  'de' | 'de-DE' | 'de-CH' |
  'en' | 'en-AU';
type PathMapping = Record<string, Record<Locale, string>>;

const pathMapping: PathMapping = {
  'api::article.article': {
    ['nl']: 'artikelen',
    ['nl-NL']: 'artikelen',
    ['de']: 'artikelen',
    ['de-DE']: 'artikelen',
    ['de-CH']: 'artikelen',
    ['en']: 'articles',
    ['en-AU']: 'articles',
  },
  'api::page.page': {
    ['nl']: '',
    ['nl-NL']: '',
    ['de']: '',
    ['de-DE']: '',
    ['de-CH']: '',
    ['en']: '',
    ['en-AU']: '',
  },
  'api::page-case-study.page-case-study': {
    ['nl']: 'casestudies',
    ['nl-NL']: 'casestudies',
    ['de']: 'referenzen',
    ['de-DE']: 'referenzen',
    ['de-CH']: 'referenzen',
    ['en']: 'case-studies',
    ['en-AU']: 'case-studies',
  },
};

function makeSlug(
  model: string,
  title: string,
  locale: Locale
): string {
  const modelConfig = pathMapping[model];
  if (title.startsWith(`/${locale}/`)) {
    return title;
  }
  if (modelConfig && modelConfig[locale]) {
    const basePath = modelConfig[locale];
    return `/${locale}/${basePath}/${title}`;
  }
  if (modelConfig[locale] === "") {
    return `/${locale}/${title}`;
  }
  return title;
}

const slugify = (str: string) =>
  (str ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9\s\/-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { attribute, name, label, onChange, required, value, labelAction } = props;
  const { model, id, form } = useContentManagerContext();
  const currentLocale = (new URLSearchParams(location?.search))?.get("plugins[i18n][locale]") as Locale;

  //@ts-ignore
  const inputValue = form.values[attribute.options.override] ?? value;

  const slugged = useMemo(
    () => makeSlug(model, slugify(String(inputValue)), currentLocale),
    [model, inputValue, currentLocale]
  );

  useEffect(() => {
    if (inputValue !== '' && slugged !== value) {
      onChange({ target: { name, type: attribute.type, value: slugged } });
    }
  }, [slugged, value, name, attribute.type, onChange]);

  return (
    <Field.Root hint={"Managed by custom field"} required={required}>
      <Field.Label action={labelAction}>{label}</Field.Label>
      <Field.Input
        ref={ref}
        name={name}
        type="text"
        disabled={true}
        value={slugged}
      />
      <Field.Hint/>
      <Field.Error />
    </Field.Root>
  );
});

export default Input;
