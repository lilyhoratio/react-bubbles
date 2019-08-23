import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  console.log(colorToEdit);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth()
      .put(`http://localhost:5000/api/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        updateColors(
          colors.map(color => {
            if (color.id === colorToEdit.id) {
              console.log("IF", res.data);
              return res.data;
            } else {
              console.log("ELSE", color);
              return color;
            }
          })
        );
      })
      .catch(err => console.log("PUT ERROR: ", err));
  };

  const deleteColor = color => {
    console.log("delete", color);
    axiosWithAuth()
      .delete(`http://localhost:5000/api/colors/${color.id}`, color.id)
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log("DELETE ERROR: ", err));
  };

  // undefined colors
  if (!colors) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="colors-wrap">
        <p>colors</p>
        <ul>
          {colors.map(color => (
            <li key={color.color} onClick={() => editColor(color)}>
              <span>
                <span className="delete" onClick={() => deleteColor(color)}>
                  x
                </span>{" "}
                {color.color}
              </span>
              <div
                className="color-box"
                style={{ backgroundColor: color.code.hex }}
              />
            </li>
          ))}
        </ul>
        {editing && (
          <form onSubmit={saveEdit}>
            <legend>edit color</legend>
            <label>
              color name:
              <input
                onChange={e =>
                  setColorToEdit({ ...colorToEdit, color: e.target.value })
                }
                value={colorToEdit.color}
              />
            </label>
            <label>
              hex code:
              <input
                onChange={e =>
                  setColorToEdit({
                    ...colorToEdit,
                    code: { hex: e.target.value }
                  })
                }
                value={colorToEdit.code.hex}
              />
            </label>
            <div className="button-row">
              <button type="submit">save</button>
              <button onClick={() => setEditing(false)}>cancel</button>
            </div>
          </form>
        )}
        <div className="spacer" />
        {/* stretch - build another form here to add a color */}
      </div>
    );
  }
};

export default ColorList;
