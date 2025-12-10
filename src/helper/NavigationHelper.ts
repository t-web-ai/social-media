import { type NavigateFunction } from "react-router";

class NavigationHelper {
  private navigate: NavigateFunction | undefined;
  public setNavigate(navigateFn: NavigateFunction) {
    this.navigate = navigateFn;
  }
  public RedirectTo(to: string, replace: boolean) {
    if (this.navigate) {
      this.navigate(to, { replace });
    }
  }
}

export const navigator = new NavigationHelper();
