var Sphere = function (c, r, ka, kd, ks, specexp, kr, Ia) {
	this.c = c;
	this.r = r;
	this.ka = ka;
	this.kd = kd;
	this.ks = ks;
	this.specexp = specexp;
	this.kr = kr;
	this.Ia = Ia;
	this.type = SPHERE_TYPE;
}

var Plane = function (c, l, ka, kd, ks, specexp, kr, Ia, is_inverted) {
	this.c = c;
	this.l = l;
	if(is_inverted) this.corners = createInvertedPlaneMesh(c, l);
	else this.corners = createPlaneMesh(c, l)
	this.ka = ka;
	this.kd = kd;
	this.ks = ks;
	this.specexp = specexp;
	this.kr = kr;
	this.Ia = Ia;
	this.type = PLANE_TYPE;
}

var Light = function (c, Ilight) {
	this.c = c;
	this.Ilight = Ilight;
}

var VRP, VPN, VUP, COP;
var u, v, N;
var w_min, w_max;

var M;
var dU, dV;

var Spheres, Mirror, LS, Objects;
var Eye;

const load = () => {

	VRP = [0, 0, 0];
	VPN = [0, 0, 1];
	VUP = [0, 1, 0];
	COP = [0, 0, 8];

	w_min = [-8, -8];
	w_max = [8, 8];

	dU = (w_max[X] - w_min[X]) / WIDTH;
	dV = (w_max[Y] - w_min[Y]) / HEIGHT;

	N = getUnitVector(VPN);
	v = getUnitVector(math.subtract(getUnitVector(VUP), math.multiply(math.dot(getUnitVector(VUP), N), N)));
	u = math.cross(v, N);

	M = [
		[u[X], u[Y], u[Z]],
		[v[X], v[Y], v[Z]],
		[N[X], N[Y], N[Z]]
	];

	LS = [];
	LS.push(new Light([0, 20, 0], WHITE));

	Objects = [];
	Objects.push(new Sphere([0, 0, -8], 2, 0.5, 0.4, 0.1, 1, 0, RED));

	Objects.push(new Plane([0, -4, 0], 4, 0.3, 0.4, 0.3, 5, 1, GRAY, false));
	Objects.push(new Plane([0, -4, 0], 4, 0.3, 0.4, 0.3, 5, 1, GRAY, true));

	updateObjectDropdown();
	render();
}

const PSet = (x, y, color) => {
	if (x > 0 && x < WIDTH && y > 0 && y < HEIGHT) {
		color = "#" + rgbToHex(color[X]) + rgbToHex(color[Y]) + rgbToHex(color[Z]);
		ctx.fillStyle = color;
		ctx.fillRect(x, y, 1, 1);
	}
}

const render = () => {
	var Rd, DOP;
	var u, v, c;

	Eye = math.add(math.multiply(COP, M), VRP);

	for (var j = 0; j < HEIGHT - 1; j++) {
		for (var i = 0; i < WIDTH - 1; i++) {
			u = w_min[X] + i * dU;
			v = w_max[Y] - j * dV;

			DOP = math.subtract([u, v, 0], Eye);
			Rd = math.multiply(getUnitVector(DOP), M);
			c = getIntensity(Eye, Rd, MAX_DEPTH);
			PSet(i, j, c);
		}
	}
}

const getIntensity = (R0, Rd, depth) => {
	if (depth == 0) return [0, 0, 0];

	var nearestIntersection = getNearestIntersection(R0, Rd);
	var Obj, tMin;

	if (nearestIntersection != null) {
		Obj = nearestIntersection["Object"];
		tMin = nearestIntersection["tMin"];
	} else return BLACK;

	var P = math.add(R0, math.multiply(Rd, tMin));

	var Iamb = math.multiply(Obj.Ia, Obj.ka);
	var Idiff = [0, 0, 0];
	var Ispec = [0, 0, 0];

	var N;

	if (Obj.type === SPHERE_TYPE) {
		N = getUnitVector(math.subtract(P, Obj.c));
	} else if (Obj.type === PLANE_TYPE) {
		var p1, p2, p3;
		p1 = Obj.corners[0][0];
		p2 = Obj.corners[0][1];
		p3 = Obj.corners[0][2];

		var v0, v1;
		v0 = math.subtract(p2, p1);
		v1 = math.subtract(p3, p1);

		N = getUnitVector(math.cross(v0, v1));
	}

	for (var i = 0; i < LS.length; i++) {
		var L = getUnitVector(math.subtract(LS[i].c, P));
		var Rl = math.multiply(-1, L);
		var tLMin = getNearestIntersection(LS[i].c, Rl);

		if (tLMin != null) {
			tLMin = tLMin["tMin"];

			var tL;

			if (Obj.type == SPHERE_TYPE) tL = getSphereIntersection(Obj, LS[i].c, Rl);
			else if (Obj.type == PLANE_TYPE){ 
				// if (math.dot(N, Rl) >= 0 ) continue;
				tL = getPlaneIntersection(Obj, LS[i].c, Rl);
			}

			if (tLMin == 0 || tLMin < tL) continue;
		}

		var LdotN = math.dot(L, N);

		if (LdotN < 0) continue;

		var V = getUnitVector(math.subtract(Eye, P));
		var R = math.subtract(math.multiply(2 * LdotN, N), L);

		var VdotR = math.dot(V, R);

		var temp = [
			LS[i].Ilight[X],
			LS[i].Ilight[Y],
			LS[i].Ilight[Z]
		]

		Idiff = colorValidation(math.add(Idiff, colorValidation(math.multiply(math.multiply(temp, Obj.kd), LdotN))));
		Ispec = colorValidation(math.add(Ispec, colorValidation(math.multiply(math.multiply(temp, Obj.ks), math.pow(VdotR, Obj.specexp)))));
	}

	var Rf = math.add(math.multiply(-2 * math.dot(Rd, N), N), Rd);
	var Ireflect = colorValidation(math.multiply(Obj.kr, getIntensity(P, Rf, depth - 1)));

	Itot = colorValidation(math.add(colorValidation(math.add(Iamb, colorValidation(math.add(Idiff, Ispec)))), Ireflect));

	return Itot;
}

const getNearestIntersection = (R0, Rd) => {
	var t;
	var tMin = Number.POSITIVE_INFINITY;
	var idx = -1;

	for (var i = 0; i < Objects.length; i++) {
		if (Objects[i].type == SPHERE_TYPE) t = getSphereIntersection(Objects[i], R0, Rd);
		else if (Objects[i].type == PLANE_TYPE) t = getPlaneIntersection(Objects[i], R0, Rd);

		if (t != null && t < tMin) {
			tMin = t;
			idx = i;
		}
	}

	if (idx !== -1) {
		return {
			"Object": Objects[idx],
			"tMin": tMin
		};
	}

	return null;
}

const getSphereIntersection = (Obj, R0, Rd) => {
	var S = math.subtract(Obj.c, R0);
	var td = math.dot(S, Rd);
	var d2 = math.dot(S, S) - td * td;
	var r2 = Obj.r * Obj.r;

	if (d2 < r2) {
		var t = td - math.sqrt(r2 - d2);

		if (t > 0) return t;
	}

	return null;
}

const getPlaneIntersection = (Obj, R0, Rd) => {
	for (var i = 0; i < Obj.corners.length; i++) {
		var p1, p2, p3;
		p1 = Obj.corners[i][0];
		p2 = Obj.corners[i][1];
		p3 = Obj.corners[i][2];

		var v0, v1, v2;
		v0 = math.subtract(p2, p1);
		v1 = math.subtract(p3, p1);

		var normal = math.cross(v0, v1);
		var Vd = math.dot(normal, Rd);

		if (Vd < 0) {
			t = -1 * (math.dot(normal, R0) - math.dot(p1, normal)) / Vd;

			if (t > 0) {
				var P = math.add(R0, math.multiply(Rd, t));
				v2 = math.subtract(P, p1);

				var d00, d01, d02, d11, d12, C;
				d00 = math.dot(v0, v0);
				d01 = math.dot(v0, v1);
				d02 = math.dot(v0, v2);
				d11 = math.dot(v1, v1);
				d12 = math.dot(v1, v2);
				C = d00 * d11 - d01 * d01;

				var n1, n2, n3;
				n2 = (d11 * d02 - d01 * d12) / C;
				n3 = (d00 * d12 - d01 * d02) / C;
				n1 = 1 - n2 - n3;

				if (n1 >= 0 && n1 <= 1) {
					if (n2 >= 0 && n2 <= 1) {
						if (n3 >= 0 && n3 <= 1) 
							return t;
					}
				}
			}
		}
	}

	return null;
}

const createPlaneMesh = (center, length) => {
	const d = length / 2;
	const x = center[X];
	const y = center[Y];
	const z = center[Z]

	return [
		[
			[x - d, y, z + d],
			[x + d, y, z + d],
			[x + d, y, z - d],
		],
		[
			[x - d, y, z + d],
			[x + d, y, z - d],
			[x - d, y, z - d],
		]
	]
}

const createInvertedPlaneMesh = (center, length) => {
	const d = length / 2;
	const x = center[X];
	const y = center[Y];
	const z = center[Z]
   
	return [
	 [
	  [x - d, y, z + d],
	  [x + d, y, z - d],
	  [x + d, y, z + d]
	 ],
	 [
	  [x - d, y, z + d],
	  [x - d, y, z - d],
	  [x + d, y, z - d]
	 ]
	]
   }