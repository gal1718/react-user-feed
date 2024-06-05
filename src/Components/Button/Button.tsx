import React from "react";

//type for the element properties (autofocus, type and so on)
type elementProps = React.ComponentPropsWithoutRef<"button">;

//type for the css properties
type CssButtonProps = {
  style: React.CSSProperties;
};

//combining the 2 types above to a final btnprops that adds the children and the props that the father comp mentioned directly. in interface we use extending with intersecting (&) 
type ButtonProps = CssButtonProps &
  elementProps & {
    children: React.ReactNode;
    onClick: () => void;
  };


//instead of writing the autofocus directly we can use the rest spread... 
const Button = ({ children, onClick, style, ...rest }: ButtonProps) => {
  return (
    <div className="Button">
      <button {...rest} style={style} onClick={onClick}>
        {children}
      </button>
    </div>
  );
};

export default Button;
