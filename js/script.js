var SELECTED_TYPE = "";
var INDEX = "";

const DISTANCE = 1;

const addObject = () => {
  const selected_add_object = document.getElementById(
    "selected-add-object"
  ).value;

  if (selected_add_object === SPHERE_TYPE) {
    Swal.fire({
      title: "Add New Sphere",
      html: `
      <div class="columns"> 
        <div class="column">
          <input type="text" id="x" class="input" placeholder="x" required>
        </div>
        <div class="column">
          <input type="text" id="y" class="input" placeholder="y" required>
        </div>
        <div class="column">
          <input type="text" id="z" class="input" placeholder="z" required>
        </div>
        <div class="column">
          <input type="text" id="r" class="input" placeholder="Radius" required>
        </div>
      </div>
      <div class="columns"> 
        <div class="column">
          <input type="text" id="ka" class="input" placeholder="Ambient" required>
        </div>
        <div class="column">
          <input type="text" id="kd" class="input" placeholder="Diffuse" required>
        </div>
        <div class="column">
          <input type="text" id="ks" class="input" placeholder="Specular" required>
        </div>
      </div>
      <div class="columns"> 
        <div class="column">
          <input type="text" id="specexp" class="input" placeholder="Specular Exponent" required>
        </div>
        <div class="column">
          <input type="text" id="kr" class="input" placeholder="Reflection" required>
        </div>
        <div class="column">
          <input type="text" id="color" class="input" placeholder="Color" required>
        </div>
      </div>
      `,
      confirmButtonText: "Add",
      focusConfirm: false,
      preConfirm: () => {
        const x = Swal.getPopup().querySelector("#x").value;
        const y = Swal.getPopup().querySelector("#y").value;
        const z = Swal.getPopup().querySelector("#z").value;
        const r = Swal.getPopup().querySelector("#r").value;
        const ka = Swal.getPopup().querySelector("#ka").value;
        const kd = Swal.getPopup().querySelector("#kd").value;
        const ks = Swal.getPopup().querySelector("#ks").value;
        const specexp = Swal.getPopup().querySelector("#specexp").value;
        const kr = Swal.getPopup().querySelector("#kr").value;
        const color = hexToRGB(Swal.getPopup().querySelector("#color").value);

        if (!x || !y || !z || !r || !ka || !kd || !ks || !kr || !specexp)
          Swal.showValidationMessage(`Please enter all the data`);
        else if (isNaN(x))
          Swal.showValidationMessage(`The x value must be numeric`);
        else if (isNaN(y))
          Swal.showValidationMessage(`The y value must be numeric`);
        else if (isNaN(z))
          Swal.showValidationMessage(`The z value must be numeric`);
        else if (isNaN(r))
          Swal.showValidationMessage(`The radius value must be numeric`);
        else if (r <= 0)
          Swal.showValidationMessage(
            `The radius value cannot be zero or below`
          );
        else if (isNaN(ka))
          Swal.showValidationMessage(`The ambient coefficient must be numeric`);
        else if (ka < 0)
          Swal.showValidationMessage(
            `The ambient coefficient cannot be negative`
          );
        else if (isNaN(kd))
          Swal.showValidationMessage(`The diffuse coefficient must be numeric`);
        else if (kd < 0)
          Swal.showValidationMessage(
            `The diffuse coefficient cannot be negative`
          );
        else if (isNaN(ks))
          Swal.showValidationMessage(
            `The specular coefficient must be numeric`
          );
        else if (ks < 0)
          Swal.showValidationMessage(
            `The specular coefficient cannot be negative`
          );
        else if (isNaN(kr))
          Swal.showValidationMessage(
            `The reflection coefficient must be numeric`
          );
        else if (kr < 0)
          Swal.showValidationMessage(
            `The reflection coefficient cannot be negative`
          );
        else if (isNaN(specexp))
          Swal.showValidationMessage(
            `The specular exponent value must be numeric`
          );
        else if (specexp < 0)
          Swal.showValidationMessage(
            `The specular exponent cannot be negative`
          );
        else if (!color)
          Swal.showValidationMessage(`The hexcode color is invalid`);

        return { x, y, z, r, ka, kd, ks, specexp, kr, color };
      },
    }).then((result) => {
      const x = parseFloat(result.value.x);
      const y = parseFloat(result.value.y);
      const z = parseFloat(result.value.z);
      const r = parseFloat(result.value.r);
      const ka = parseFloat(result.value.ka);
      const kd = parseFloat(result.value.kd);
      const ks = parseFloat(result.value.ks);
      const kr = parseFloat(result.value.kr);
      const specexp = parseFloat(result.value.specexp);
      const color = result.value.color;

      Objects.push(new Sphere([x, y, z], r, ka, kd, ks, specexp, kr, color));

      updateObjectDropdown();
      render();
    });
  } else if (selected_add_object === PLANE_TYPE) {
    Swal.fire({
      title: "Add New Plane",
      html: `
      <div class="columns"> 
        <div class="column">
          <input type="text" id="x" class="input" placeholder="x" required>
        </div>
        <div class="column">
          <input type="text" id="y" class="input" placeholder="y" required>
        </div>
        <div class="column">
          <input type="text" id="z" class="input" placeholder="z" required>
        </div>
        <div class="column">
          <input type="text" id="l" class="input" placeholder="Length" required>
        </div>
      </div>
      <div class="columns"> 
        <div class="column">
          <input type="text" id="ka" class="input" placeholder="Ambient" required>
        </div>
        <div class="column">
          <input type="text" id="kd" class="input" placeholder="Diffuse" required>
        </div>
        <div class="column">
          <input type="text" id="ks" class="input" placeholder="Specular" required>
        </div>
      </div>
      <div class="columns"> 
        <div class="column">
          <input type="text" id="specexp" class="input" placeholder="Specular Exponent" required>
        </div>
        <div class="column">
          <input type="text" id="kr" class="input" placeholder="Reflection" required>
        </div>
        <div class="column">
          <input type="text" id="color" class="input" placeholder="Color" required>
        </div>
      </div>
      `,
      confirmButtonText: "Add",
      focusConfirm: false,
      preConfirm: () => {
        const x = Swal.getPopup().querySelector("#x").value;
        const y = Swal.getPopup().querySelector("#y").value;
        const z = Swal.getPopup().querySelector("#z").value;
        const l = Swal.getPopup().querySelector("#l").value;
        const ka = Swal.getPopup().querySelector("#ka").value;
        const kd = Swal.getPopup().querySelector("#kd").value;
        const ks = Swal.getPopup().querySelector("#ks").value;
        const specexp = Swal.getPopup().querySelector("#specexp").value;
        const kr = Swal.getPopup().querySelector("#kr").value;
        const color = hexToRGB(Swal.getPopup().querySelector("#color").value);

        if (!x || !y || !z || !l || !ka || !kd || !ks || !kr || !specexp)
          Swal.showValidationMessage(`Please enter all the data`);
        else if (isNaN(x))
          Swal.showValidationMessage(`The x value must be numeric`);
        else if (isNaN(y))
          Swal.showValidationMessage(`The y value must be numeric`);
        else if (isNaN(z))
          Swal.showValidationMessage(`The z value must be numeric`);
        else if (isNaN(l))
          Swal.showValidationMessage(`The length value must be numeric`);
        else if (l <= 0)
          Swal.showValidationMessage(
            `The length value cannot be zero or below`
          );
        else if (isNaN(ka))
          Swal.showValidationMessage(`The ambient coefficient must be numeric`);
        else if (ka < 0)
          Swal.showValidationMessage(
            `The ambient coefficient cannot be negative`
          );
        else if (isNaN(kd))
          Swal.showValidationMessage(`The diffuse coefficient must be numeric`);
        else if (kd < 0)
          Swal.showValidationMessage(
            `The diffuse coefficient cannot be negative`
          );
        else if (isNaN(ks))
          Swal.showValidationMessage(
            `The specular coefficient must be numeric`
          );
        else if (ks < 0)
          Swal.showValidationMessage(
            `The specular coefficient cannot be negative`
          );
        else if (isNaN(kr))
          Swal.showValidationMessage(
            `The reflection coefficient must be numeric`
          );
        else if (kr < 0)
          Swal.showValidationMessage(
            `The reflection coefficient cannot be negative`
          );
        else if (isNaN(specexp))
          Swal.showValidationMessage(
            `The specular exponent value must be numeric`
          );
        else if (specexp < 0)
          Swal.showValidationMessage(
            `The specular exponent cannot be negative`
          );
        else if (!color)
          Swal.showValidationMessage(`The hexcode color is invalid`);

        return { x, y, z, l, ka, kd, ks, specexp, kr, color };
      },
    }).then((result) => {
      const x = parseFloat(result.value.x);
      const y = parseFloat(result.value.y);
      const z = parseFloat(result.value.z);
      const l = parseFloat(result.value.l);
      const ka = parseFloat(result.value.ka);
      const kd = parseFloat(result.value.kd);
      const ks = parseFloat(result.value.ks);
      const specexp = parseFloat(result.value.specexp);
      const kr = parseFloat(result.value.kr);
      const color = result.value.color;

      Objects.push(
        new Plane([x, y, z], l, ka, kd, ks, specexp, kr, color, false)
      );
      Objects.push(
        new Plane([x, y, z], l, ka, kd, ks, specexp, kr, color, true)
      );

      updateObjectDropdown();
      render();
    });
  } else if (selected_add_object === LIGHT_SOURCE_TYPE) {
    Swal.fire({
      title: "Add New Light Source",
      html: `
      <div class="columns"> 
        <div class="column">
          <input type="text" id="x" class="input" placeholder="x" required>
        </div>
        <div class="column">
          <input type="text" id="y" class="input" placeholder="y" required>
        </div>
        <div class="column">
          <input type="text" id="z" class="input" placeholder="z" required>
        </div>
      </div>
      <div class="columns"> 
        <input type="text" id="color" class="input" placeholder="Color" required>
      </div>
      `,
      confirmButtonText: "Add",
      focusConfirm: false,
      preConfirm: () => {
        const x = Swal.getPopup().querySelector("#x").value;
        const y = Swal.getPopup().querySelector("#y").value;
        const z = Swal.getPopup().querySelector("#z").value;
        const color = hexToRGB(Swal.getPopup().querySelector("#color").value);

        if (!x || !y || !z)
          Swal.showValidationMessage(`Please enter all the data`);

        if (isNaN(x)) Swal.showValidationMessage(`The x value must be numeric`);
        else if (isNaN(y))
          Swal.showValidationMessage(`The y value must be numeric`);
        else if (isNaN(z))
          Swal.showValidationMessage(`The z value must be numeric`);
        else if (!color)
          Swal.showValidationMessage(`The hexcode color is invalid`);

        return { x, y, z, color };
      },
    }).then((result) => {
      const x = parseFloat(result.value.x);
      const y = parseFloat(result.value.y);
      const z = parseFloat(result.value.z);
      const color = result.value.color;

      LS.push(new Light([x, y, z], color));

      updateObjectDropdown();
      render();
    });
  }
};

const removeObject = () => {
  if (SELECTED_TYPE.length === 0) {
    Swal.fire("Missing Value", "You must select the object.", "error");
    return;
  }

  if (SELECTED_TYPE === LIGHT_SOURCE_TYPE) LS.splice(INDEX, 1);
  else if (SELECTED_TYPE === PLANE_TYPE) Objects.splice(INDEX, 2);
  else if (SELECTED_TYPE === SPHERE_TYPE) Objects.splice(INDEX, 1);

  SELECTED_TYPE = "";
  INDEX = "";

  updateObjectDropdown();
  updateForm();
  render();
};

const updateObjectDropdown = () => {
  var selected_modified_object = document.getElementById(
    "selected-modified-object"
  );
  selected_modified_object.innerHTML = "";

  var option = document.createElement("option");
  option.text = "Select the object to be modified";
  option.disabled = true;
  option.selected = true;
  selected_modified_object.appendChild(option);

  var len = LS.length;

  for (var i = 0; i < len; i++) {
    var option = document.createElement("option");
    option.text = "Light Source " + (i + 1);
    option.value = "LS-" + i;
    selected_modified_object.appendChild(option);
  }

  len = Objects.length;

  var num_of_spheres = 1;
  var num_of_planes = 1;

  for (var i = 0; i < len; i++) {
    var option = document.createElement("option");

    if (Objects[i].type === SPHERE_TYPE) {
      option.text = "Sphere " + num_of_spheres;
      option.value = "SP-" + i;
      num_of_spheres++;
    } else if (Objects[i].type === PLANE_TYPE) {
      option.text = "Plane " + num_of_planes;
      option.value = "PL-" + i;
      num_of_planes++;
      i++;
    }

    selected_modified_object.appendChild(option);
  }
};

const updateForm = () => {
  if (SELECTED_TYPE.length === 0) {
    document.getElementById("x-position").disabled = true;
    document.getElementById("y-position").disabled = true;
    document.getElementById("z-position").disabled = true;
    document.getElementById("transform-button").disabled = true;
    document.getElementById("remove-button").disabled = true;
  } else {
    if (SELECTED_TYPE === LIGHT_SOURCE_TYPE) {
      document.getElementById("x-position").value = LS[INDEX].c[X];
      document.getElementById("y-position").value = LS[INDEX].c[Y];
      document.getElementById("z-position").value = LS[INDEX].c[Z];
    } else {
      document.getElementById("x-position").value = Objects[INDEX].c[X];
      document.getElementById("y-position").value = Objects[INDEX].c[Y];
      document.getElementById("z-position").value = Objects[INDEX].c[Z];
    }

    document.getElementById("x-position").disabled = false;
    document.getElementById("y-position").disabled = false;
    document.getElementById("z-position").disabled = false;
    document.getElementById("transform-button").disabled = false;
    document.getElementById("remove-button").disabled = false;
  }

  if (SELECTED_TYPE === PLANE_TYPE) {
    document.getElementById("degree").value = 0;
    document.getElementById("degree").disabled = false;
    document.getElementById("selected-rotation").disabled = false;
  } else {
    document.getElementById("degree").value = "";
    document.getElementById("degree").disabled = true;
    document.getElementById("selected-rotation").disabled = true;
  }

  if (SELECTED_TYPE === SPHERE_TYPE || SELECTED_TYPE === PLANE_TYPE) {
    document.getElementById("ambient").value = Objects[INDEX].ka;
    document.getElementById("diffuse").value = Objects[INDEX].kd;
    document.getElementById("specular").value = Objects[INDEX].ks;
    document.getElementById("specular-exponent").value = Objects[INDEX].specexp;
    document.getElementById("reflection").value = Objects[INDEX].kr;

    document.getElementById("ambient").disabled = false;
    document.getElementById("diffuse").disabled = false;
    document.getElementById("specular").disabled = false;
    document.getElementById("specular-exponent").disabled = false;
    document.getElementById("reflection").disabled = false;
    document.getElementById("lighting-button").disabled = false;
  } else {
    document.getElementById("ambient").value = "";
    document.getElementById("diffuse").value = "";
    document.getElementById("specular").value = "";
    document.getElementById("specular-exponent").value = "";
    document.getElementById("reflection").value = "";

    document.getElementById("ambient").disabled = true;
    document.getElementById("diffuse").disabled = true;
    document.getElementById("specular").disabled = true;
    document.getElementById("specular-exponent").disabled = true;
    document.getElementById("reflection").disabled = true;
    document.getElementById("lighting-button").disabled = true;
  }
};

const updateSelectedObject = () => {
  const temp = document.getElementById("selected-modified-object").value;

  [SELECTED_TYPE, INDEX] = temp.split("-");
  INDEX = parseInt(INDEX);

  updateForm();
};

const transform = () => {
  if (SELECTED_TYPE.length === 0) {
    Swal.fire("Missing Value", "You must select the object.", "error");
    return;
  }

  updatePosition();

  if (SELECTED_TYPE === PLANE_TYPE) {
    const rotation = document.getElementById("selected-rotation").value;
    const degree = document.getElementById("degree").value;

    if (degree.length === 0) {
      Swal.fire("Missing Value", "You must enter the degree.", "error");
      return;
    }

    if (isNaN(degree)) {
      Swal.fire("Invalid Input", "The degree value must be numeric.", "error");
      return;
    }

    if (rotation === ROTATION_X) rotateX(parseFloat(degree));
    else if (rotation === ROTATION_Y) rotateY(parseFloat(degree));
    else if (rotation === ROTATION_Z) rotateZ(parseFloat(degree));
  }

  updateForm();
  render();
};

const updatePosition = () => {
  const x = document.getElementById("x-position").value;
  const y = document.getElementById("y-position").value;
  const z = document.getElementById("z-position").value;

  if (x.length === 0) {
    Swal.fire("Missing Value", "You must enter the x value.", "error");
    return;
  }
  if (y.length === 0) {
    Swal.fire("Missing Value", "You must enter the y value.", "error");
    return;
  }
  if (z.length === 0) {
    Swal.fire("Missing Value", "You must enter the z value.", "error");
    return;
  }

  if (isNaN(x)) {
    Swal.fire("Invalid Input", "The x value must be numeric.", "error");
    return;
  }
  if (isNaN(y)) {
    Swal.fire("Invalid Input", "The y value must be numeric.", "error");
    return;
  }
  if (isNaN(z)) {
    Swal.fire("Invalid Input", "The z value must be numeric.", "error");
    return;
  }

  updateSelectedObjectPosition(parseFloat(x), parseFloat(y), parseFloat(z));
};

const updateSelectedObjectPosition = (x, y, z) => {
  if (SELECTED_TYPE === LIGHT_SOURCE_TYPE) {
    LS[INDEX].c = [x, y, z];
  } else {
    if (SELECTED_TYPE === PLANE_TYPE) {
      const temp = math.subtract([x, y, z], Objects[INDEX].c);

      Objects[INDEX].corners[0] = Objects[INDEX].corners[0].map((vertex) =>
        math.add(vertex, temp)
      );
      Objects[INDEX].corners[1] = Objects[INDEX].corners[1].map((vertex) =>
        math.add(vertex, temp)
      );

      Objects[INDEX + 1].corners[0] = Objects[INDEX + 1].corners[0].map(
        (vertex) => math.add(vertex, temp)
      );
      Objects[INDEX + 1].corners[1] = Objects[INDEX + 1].corners[1].map(
        (vertex) => math.add(vertex, temp)
      );

      Objects[INDEX + 1].c = [x, y, z];
    }

    Objects[INDEX].c = [x, y, z];
  }
};

const rotateX = (degree) => {
  rotateSelectedObject([
    [1, 0, 0],
    [0, cos(degree), 0 - sin(degree)],
    [0, sin(degree), cos(degree)],
  ]);
};

const rotateY = (degree) => {
  rotateSelectedObject([
    [cos(degree), 0, sin(degree)],
    [0, 1, 0],
    [0 - sin(degree), 0, cos(degree)],
  ]);
};

const rotateZ = (degree) => {
  rotateSelectedObject([
    [cos(degree), 0 - sin(degree), 0],
    [sin(degree), cos(degree), 0],
    [0, 0, 1],
  ]);
};

const rotateSelectedObject = (T) => {
  const temp = Objects[INDEX].c;

  Objects[INDEX].corners[0] = Objects[INDEX].corners[0].map((vertex) =>
    math.subtract(vertex, temp)
  );
  Objects[INDEX].corners[1] = Objects[INDEX].corners[1].map((vertex) =>
    math.subtract(vertex, temp)
  );

  Objects[INDEX + 1].corners[0] = Objects[INDEX + 1].corners[0].map((vertex) =>
    math.subtract(vertex, temp)
  );
  Objects[INDEX + 1].corners[1] = Objects[INDEX + 1].corners[1].map((vertex) =>
    math.subtract(vertex, temp)
  );

  Objects[INDEX].corners[0] = Objects[INDEX].corners[0].map((vertex) =>
    math.multiply(vertex, T)
  );
  Objects[INDEX].corners[1] = Objects[INDEX].corners[1].map((vertex) =>
    math.multiply(vertex, T)
  );

  Objects[INDEX + 1].corners[0] = Objects[INDEX + 1].corners[0].map((vertex) =>
    math.multiply(vertex, T)
  );
  Objects[INDEX + 1].corners[1] = Objects[INDEX + 1].corners[1].map((vertex) =>
    math.multiply(vertex, T)
  );

  Objects[INDEX].corners[0] = Objects[INDEX].corners[0].map((vertex) =>
    math.add(vertex, temp)
  );
  Objects[INDEX].corners[1] = Objects[INDEX].corners[1].map((vertex) =>
    math.add(vertex, temp)
  );

  Objects[INDEX + 1].corners[0] = Objects[INDEX + 1].corners[0].map((vertex) =>
    math.add(vertex, temp)
  );
  Objects[INDEX + 1].corners[1] = Objects[INDEX + 1].corners[1].map((vertex) =>
    math.add(vertex, temp)
  );
};

const lighting = () => {
  if (SELECTED_TYPE.length === 0) {
    Swal.fire("Missing Value", "You must select the object.", "error");
    return;
  }

  updateAmbient();
  updateDiffuse();
  updateSpecular();
  updateReflection();
  updateSpecularExponent();

  updateForm();
  render();
};

const updateAmbient = () => {
  const ambient = document.getElementById("ambient").value;

  if (ambient.length === 0) {
    Swal.fire("Missing Value", "You must enter the ambient.", "error");
    return;
  }

  if (isNaN(ambient)) {
    Swal.fire(
      "Invalid Input",
      "The ambient coefficient must be numeric.",
      "error"
    );
    return;
  }

  if (ambient < 0) {
    Swal.fire(
      "Invalid Input",
      "The ambient coefficient cannot be negative.",
      "error"
    );
    return;
  }

  Objects[INDEX].ka = parseFloat(ambient);

  if (SELECTED_TYPE === PLANE_TYPE) Objects[INDEX + 1].ka = parseFloat(ambient);
};

const updateDiffuse = () => {
  const diffuse = document.getElementById("diffuse").value;

  if (diffuse.length === 0) {
    Swal.fire("Missing Value", "You must enter the diffuse.", "error");
    return;
  }

  if (isNaN(diffuse)) {
    Swal.fire(
      "Invalid Input",
      "The diffuse coefficient must be numeric.",
      "error"
    );
    return;
  }

  if (diffuse < 0) {
    Swal.fire(
      "Invalid Input",
      "The diffuse coefficient cannot be negative.",
      "error"
    );
    return;
  }

  Objects[INDEX].kd = parseFloat(diffuse);

  if (SELECTED_TYPE === PLANE_TYPE) Objects[INDEX + 1].kd = parseFloat(diffuse);
};

const updateSpecular = () => {
  const specular = document.getElementById("specular").value;

  if (specular.length === 0) {
    Swal.fire("Missing Value", "You must enter the specular.", "error");
    return;
  }

  if (isNaN(specular)) {
    Swal.fire(
      "Invalid Input",
      "The specular coefficient must be numeric.",
      "error"
    );
    return;
  }

  if (specular < 0) {
    Swal.fire(
      "Invalid Input",
      "The specular coefficient cannot be negative.",
      "error"
    );
    return;
  }

  Objects[INDEX].ks = parseFloat(specular);

  if (SELECTED_TYPE === PLANE_TYPE)
    Objects[INDEX + 1].ks = parseFloat(specular);
};

const updateReflection = () => {
  const reflection = document.getElementById("reflection").value;

  if (reflection.length === 0) {
    Swal.fire(
      "Missing Value",
      "You must enter the reflection coefficient.",
      "error"
    );
    return;
  }

  if (isNaN(reflection)) {
    Swal.fire(
      "Invalid Input",
      "The reflection coefficient must be numeric.",
      "error"
    );
    return;
  }

  if (reflection < 0) {
    Swal.fire(
      "Invalid Input",
      "The reflection coefficient cannot be negative.",
      "error"
    );
    return;
  }

  Objects[INDEX].kr = parseFloat(reflection);

  if (SELECTED_TYPE === PLANE_TYPE)
    Objects[INDEX + 1].kr = parseFloat(reflection);
};

const updateSpecularExponent = () => {
  const specular_exponent = document.getElementById("specular-exponent").value;

  if (specular_exponent.length === 0) {
    Swal.fire(
      "Missing Value",
      "You must enter the specular exponent value.",
      "error"
    );
    return;
  }

  if (isNaN(specular_exponent)) {
    Swal.fire(
      "Invalid Input",
      "The specular exponent value must be numeric.",
      "error"
    );
    return;
  }

  if (specular_exponent < 0) {
    Swal.fire(
      "Invalid Input",
      "The specular exponent value cannot be negative.",
      "error"
    );
    return;
  }

  Objects[INDEX].specexp = parseFloat(specular_exponent);

  if (SELECTED_TYPE === PLANE_TYPE)
    Objects[INDEX + 1].specexp = parseFloat(specular_exponent);
};

const changeResolution = () => {
  const selected_resolution = document.getElementById(
    "selected-resolution"
  ).value;

  canvas.width = selected_resolution;
  canvas.height = selected_resolution;

  WIDTH = selected_resolution;
  HEIGHT = selected_resolution;

  dU = (w_max[X] - w_min[X]) / WIDTH;
  dV = (w_max[Y] - w_min[Y]) / HEIGHT;

  render();
};

document.addEventListener("keydown", onkeydown, false);

var onkeydown = (e) => {
  if (SELECTED_TYPE.length === 0) return;

  if (e.key === "w") {
    if (SELECTED_TYPE === LIGHT_SOURCE_TYPE) {
      updateSelectedObjectPosition(
        LS[INDEX].c[X],
        LS[INDEX].c[Y],
        LS[INDEX].c[Z] - DISTANCE
      );
    } else {
      updateSelectedObjectPosition(
        Objects[INDEX].c[X],
        Objects[INDEX].c[Y],
        Objects[INDEX].c[Z] - DISTANCE
      );
    }
  } else if (e.key === "s") {
    if (SELECTED_TYPE === LIGHT_SOURCE_TYPE) {
      updateSelectedObjectPosition(
        LS[INDEX].c[X],
        LS[INDEX].c[Y],
        LS[INDEX].c[Z] + DISTANCE
      );
    } else {
      updateSelectedObjectPosition(
        Objects[INDEX].c[X],
        Objects[INDEX].c[Y],
        Objects[INDEX].c[Z] + DISTANCE
      );
    }
  } else if (e.key === "a") {
    if (SELECTED_TYPE === LIGHT_SOURCE_TYPE) {
      updateSelectedObjectPosition(
        LS[INDEX].c[X] - DISTANCE,
        LS[INDEX].c[Y],
        LS[INDEX].c[Z]
      );
    } else {
      updateSelectedObjectPosition(
        Objects[INDEX].c[X] - DISTANCE,
        Objects[INDEX].c[Y],
        Objects[INDEX].c[Z]
      );
    }
  } else if (e.key === "d") {
    if (SELECTED_TYPE === LIGHT_SOURCE_TYPE) {
      updateSelectedObjectPosition(
        LS[INDEX].c[X] + DISTANCE,
        LS[INDEX].c[Y],
        LS[INDEX].c[Z]
      );
    } else {
      updateSelectedObjectPosition(
        Objects[INDEX].c[X] + DISTANCE,
        Objects[INDEX].c[Y],
        Objects[INDEX].c[Z]
      );
    }
  } else if (e.key === " ") {
    if (SELECTED_TYPE === LIGHT_SOURCE_TYPE) {
      updateSelectedObjectPosition(
        LS[INDEX].c[X],
        LS[INDEX].c[Y] + DISTANCE,
        LS[INDEX].c[Z]
      );
    } else {
      updateSelectedObjectPosition(
        Objects[INDEX].c[X],
        Objects[INDEX].c[Y] + DISTANCE,
        Objects[INDEX].c[Z]
      );
    }
  } else if (e.key === "Shift") {
    if (SELECTED_TYPE === LIGHT_SOURCE_TYPE) {
      updateSelectedObjectPosition(
        LS[INDEX].c[X],
        LS[INDEX].c[Y] - DISTANCE,
        LS[INDEX].c[Z]
      );
    } else {
      updateSelectedObjectPosition(
        Objects[INDEX].c[X],
        Objects[INDEX].c[Y] - DISTANCE,
        Objects[INDEX].c[Z]
      );
    }
  } else if (e.key === "n") {
    if (DISTANCE - 1 <= 0) return;
    DISTANCE -= 1;
  } else if (e.key === "m") {
    DISTANCE += 1;
  } else return;

  updateForm();
  render();
};
