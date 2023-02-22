import i18n from "src/locale/i18n";

export default class RouteBuilder {
  public static langCodes: string[] = [];

  private readonly prefix: string = '';

  private isPaginated: boolean = false;

  private _name: string;

  private route: any = {
    meta: {},
  };

  path(route): RouteBuilder {
    this.route.path = route;
    return this;
  }

  name(name): RouteBuilder {
    this._name = name;
    return this;
  }

  component(component): RouteBuilder {
    this.route.component = component;
    return this;
  }

  title(value, addSite = true): RouteBuilder {
    if (value) {
      value = i18n.global.t(value);
      if (addSite) {
        value += ` - ${i18n.global.t('site-name')}`;
      }
      this.route.meta.title = value;
    }
    return this;
  }

  meta(key, value): RouteBuilder {
    this.route.meta[key] = value;
    return this;
  }

  paginate(): RouteBuilder {
    this.isPaginated = true;
    return this;
  }

  build(shouldLocalize = true) {
    let result = [];

    if (shouldLocalize) {
      RouteBuilder.langCodes.forEach((langCode) => {
        result = result.concat(this.getLocalizedRoutes(langCode));
      });
    } else {
      result = result.concat(this.getLocalizedRoutes(null));
    }

    return result;
  }

  private getLocalizedRoutes(langCode) {
    const result = [];
    const route = { ...this.route };
    if (langCode) route.path = `/${langCode}${route.path}`;
    if (this._name) {
      route.name = `${this._name}-${langCode}`;
    }
    result.push(route);

    if (this.isPaginated) {
      const paginated = { ...route };
      paginated.path = `${route.path}/offset/:offset`;
      result.push(paginated);
      route.redirect = `${route.path}/offset/0`;
    }
    return result;
  }
}
