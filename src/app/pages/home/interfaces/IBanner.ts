import { ELanguage, EStatus } from "../../../core/enums";
import { IButton } from "./IButton";



export interface IBanner {
  name: string,
  image : string | null,
  action : string,
  heading : string,
  text : string,
    buttons: {
    buttonOne?: IButton;
    buttonTwo?: IButton;
  };
  links: {
    linkOne?: IButton;
    linkTwo?: IButton;
  };
  priority : number,
}
