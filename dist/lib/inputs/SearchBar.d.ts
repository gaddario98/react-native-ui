import { ComponentProps } from "react";
import TextInput from "./TextInput";
export interface SearchBarProps extends ComponentProps<typeof TextInput> {
    onSubmit?: () => void;
    onClear?: () => void;
    loading?: boolean;
}
declare const _default: import("react").NamedExoticComponent<SearchBarProps>;
export default _default;
