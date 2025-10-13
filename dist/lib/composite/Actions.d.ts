import { ComponentProps } from "react";
import { Button } from "../base";
import { ModalProps } from "./Modal";
export type ActionsProps = Omit<ModalProps, "type"> & {
    buttons?: (ComponentProps<typeof Button> & {
        divider?: boolean;
    })[];
};
declare const Actions: React.FC<ActionsProps>;
export default Actions;
