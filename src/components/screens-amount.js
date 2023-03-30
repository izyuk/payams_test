import Select from "react-select";
import { useContext } from "react";
import { ScreensAmountContext } from "../context/screens-amount-context";

/**
 * ScreensAmount
 * @returns {JSX.Element}
 *
 * this component could be used to expand app func.
 *
 * Ex.: responsiveness, creating real grid of screens (as zoom, google meet etc.)
 */
export const ScreensAmount = () => {
  const { screenAmount, setScreenAmount } = useContext(ScreensAmountContext);
  const grid = [
    { value: "2*2", label: "2x2" },
    { value: "3*3", label: "3x3" },
    { value: "4*4", label: "4x4" },
  ];

  const defaultLayout = JSON.parse(localStorage.getItem("layout")) || {
    value: "3*3",
    label: "3x3",
  };

  const layoutSelectHandler = (data) => {
    localStorage.setItem("layout", JSON.stringify(data));
    console.log(data);
    setScreenAmount(data.value);
  };

  return (
    <div className="layout">
      <label htmlFor="layout_select">Select incoming stream layout: </label>
      <Select
        options={grid}
        defaultValue={defaultLayout}
        onChange={layoutSelectHandler}
        isSearchable={false}
      />
    </div>
  );
};
