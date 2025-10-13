import { ComponentProps, memo, useCallback, useMemo } from "react";
import TextInput from "./TextInput";
export interface SearchBarProps extends ComponentProps<typeof TextInput> {
  onSubmit?: () => void;
  onClear?: () => void;
  loading?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  onSubmit,
  onClear,
  placeholder = "Search...",
  containerStyle,
  inputStyle,
  autoFocus = false,
  disabled = false,
  variant = "primary",
  loading = false,
  ...props
}) => {
  const handleSubmitEditing = useCallback(() => {
    // Keyboard?.dismiss();
    onSubmit?.();
  }, [onSubmit]);

  const handleClear = useCallback(() => {
    if (!loading) {
      onClear?.();
      onChange?.("");
    }
  }, [loading, onClear, onChange]);

  // Importante: impostare endIcon solo quando loading è false
  const endIcon = useMemo(() => {
    // Non impostare 'sync' quando loading è true
    // Lascia che MaterialTextInput gestisca l'icona di caricamento
    return value && !loading ? "close" : undefined;
  }, [loading, value]);

  return (
    <TextInput
      value={value}
      onChange={onChange}
      onSubmitEditing={handleSubmitEditing}
      placeholder={placeholder}
      containerStyle={containerStyle}
      inputStyle={inputStyle}
      autoFocus={autoFocus}
      disabled={disabled}
      variant={variant}
      loading={loading}
      startIcon="search"
      endIcon={endIcon}
      onEndIconPress={handleClear}
      returnKeyType="search"
      {...props}
    />
  );
};

export default memo(SearchBar);
