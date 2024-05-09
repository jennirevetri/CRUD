class Vehicle {
    constructor(ownerName, ownerLastname, ownerId, ownerPhone, ownerAddress, vehiclePlate, vehicleBrand, vehicleModel, vehicleYear, vehicleColor, vehiclePic) {
        this.ownerName = ownerName;
        this.ownerLastname = ownerLastname;
        this.ownerId = ownerId;
        this.ownerPhone = ownerPhone;
        this.ownerAddress = ownerAddress;
        this.vehiclePlate = vehiclePlate;
        this.vehicleBrand = vehicleBrand;
        this.vehicleModel = vehicleModel;
        this.vehicleYear = vehicleYear;
        this.vehicleColor = vehicleColor;
        this.vehiclePic = vehiclePic;
    }
}

const vehicles = []; // Lista de vehículos

function addVehicle(vehicle) {
    vehicles.push(vehicle);
}

function removeVehicle(index) {
    vehicles.splice(index, 1);
}

function editVehicle(index, newData) {
    vehicles[index] = newData;
}


document.getElementById('vehicleForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Crear un nuevo objeto Vehicle con los valores del formulario
    const vehicle = new Vehicle(
        document.getElementById('ownerName').value,
        document.getElementById('ownerLastname').value,
        document.getElementById('ownerId').value,
        document.getElementById('ownerPhone').value,
        document.getElementById('ownerAddress').value,
        document.getElementById('vehiclePlate').value,
        document.getElementById('vehicleBrand').value,
        document.getElementById('vehicleModel').value,
        document.getElementById('vehicleYear').value,
        document.getElementById('vehicleColor').value,
        document.getElementById('vehiclePic').value
    );

    // Agregar el nuevo vehículo a la lista
    addVehicle(vehicle);

    // Renderizar la tabla con los vehículos actualizados
    renderTable();

    // Limpiar los campos del formulario después de agregar el vehículo
    this.reset();
});

function renderTable() {
    const tbody = document.getElementById('vehicleTbody');
    tbody.innerHTML = '';
    vehicles.forEach((vehicle, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${vehicle.ownerName}</td>
            <td>${vehicle.ownerLastname}</td>
            <td>${vehicle.ownerId}</td>
            <td>${vehicle.vehiclePlate}</td>
            <td><div style="width: 40px; height: 40px; background-color: ${vehicle.vehicleColor};"></div></td>
            <td><img src="${vehicle.vehiclePic}" alt="Vehicle Thumbnail" style="max-width: 100px;"></td>
            <td>
                <button onclick="showDetails(${index})">Ver</button>
                <button onclick="edit(${index})">Editar</button>
                <button onclick="remove(${index})">Borrar</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Función para editar un vehículo por su índice
// Variable global para almacenar el índice del vehículo que se está editando
let editingIndex = -1;

// Función para editar un vehículo por su índice
function edit(index) {
    // Verificar si ya se está editando un vehículo
    if (editingIndex !== -1) {
        // Si ya se está editando un vehículo, no hacer nada
        return;
    }

    const vehicle = vehicles[index];
    document.getElementById('ownerName').value = vehicle.ownerName;
    document.getElementById('ownerLastname').value = vehicle.ownerLastname;
    document.getElementById('ownerId').value = vehicle.ownerId;
    document.getElementById('ownerPhone').value = vehicle.ownerPhone;
    document.getElementById('ownerAddress').value = vehicle.ownerAddress;
    document.getElementById('vehiclePlate').value = vehicle.vehiclePlate;
    document.getElementById('vehicleBrand').value = vehicle.vehicleBrand;
    document.getElementById('vehicleModel').value = vehicle.vehicleModel;
    document.getElementById('vehicleYear').value = vehicle.vehicleYear;
    document.getElementById('vehicleColor').value = vehicle.vehicleColor;
    document.getElementById('vehiclePic').value = vehicle.vehiclePic;

    // Actualizar el índice del vehículo que se está editando
    editingIndex = index;

    // Mostrar el botón de guardar edición
    document.getElementById('submitBtn').style.display = 'none';
    document.getElementById('editBtn').style.display = 'inline-block';

    // Al hacer clic en Guardar Edición, se actualiza el vehículo
    document.getElementById('editBtn').addEventListener('click', function editHandler() {
        editVehicle(editingIndex, {
            ownerName: document.getElementById('ownerName').value,
            ownerLastname: document.getElementById('ownerLastname').value,
            ownerId: document.getElementById('ownerId').value,
            ownerPhone: document.getElementById('ownerPhone').value,
            ownerAddress: document.getElementById('ownerAddress').value,
            vehiclePlate: document.getElementById('vehiclePlate').value,
            vehicleBrand: document.getElementById('vehicleBrand').value,
            vehicleModel: document.getElementById('vehicleModel').value,
            vehicleYear: document.getElementById('vehicleYear').value,
            vehicleColor: document.getElementById('vehicleColor').value,
            vehiclePic: document.getElementById('vehiclePic').value
        });
        renderTable();

        // Limpiar los campos del formulario
        document.getElementById('vehicleForm').reset();

        // Mostrar el botón de registrar nuevamente
        document.getElementById('submitBtn').style.display = 'inline-block';
        document.getElementById('editBtn').style.display = 'none';

        // Reiniciar el índice de edición
        editingIndex = -1;

        // Eliminar el event listener para evitar duplicaciones
        document.getElementById('editBtn').removeEventListener('click', editHandler);
    });
}



function remove(index) {
    removeVehicle(index);
    renderTable();
}

function showDetails(index) {
    const vehicle = vehicles[index]; // Obtiene el vehículo seleccionado
    const modal = document.getElementById('myModal');
    const detailsContent = document.getElementById('detailsContent');

    // Construye el contenido de los detalles del vehículo en una tabla
    detailsContent.innerHTML = `
        
        <table>
            <tr>
                <td><strong>Nombre:</strong></td>
                <td>${vehicle.ownerName}</td>
            </tr>
            <tr>
                <td><strong>Apellido:</strong></td>
                <td>${vehicle.ownerLastname}</td>
            </tr>
            <tr>
                <td><strong>Cédula:</strong></td>
                <td>${vehicle.ownerId}</td>
            </tr>
            <tr>
                <td><strong>Teléfono:</strong></td>
                <td>${vehicle.ownerPhone}</td>
            </tr>
            <tr>
                <td><strong>Dirección:</strong></td>
                <td>${vehicle.ownerAddress}</td>
            </tr>
            <tr>
                <td><strong>Placa:</strong></td>
                <td>${vehicle.vehiclePlate}</td>
            </tr>
            <tr>
                <td><strong>Marca:</strong></td>
                <td>${vehicle.vehicleBrand}</td>
            </tr>
            <tr>
                <td><strong>Modelo:</strong></td>
                <td>${vehicle.vehicleModel}</td>
            </tr>
            <tr>
                <td><strong>Año:</strong></td>
                <td>${vehicle.vehicleYear}</td>
            </tr>
            <tr>
                <td><strong>Color:</strong></td>
                <td><div style="width: 40px; height: 40px; background-color: ${vehicle.vehicleColor};"></div></td>
            </tr>
            <tr>
                <td><strong>Imagen:</strong></td>
                <td><img src="${vehicle.vehiclePic}" alt="Vehicle Thumbnail" style="max-width: 100px;"></td>
            </tr>
        </table>
        
    `;

    modal.style.display = "block"; // Muestra la ventana emergente
}

// Función para cerrar la ventana emergente
function closeModal() {
    const modal = document.getElementById('myModal');
    modal.style.display = "none";
}

// Cierra la ventana emergente si el usuario hace clic fuera de ella
window.onclick = function(event) {
    const modal = document.getElementById('myModal');
    if (event.target === modal) {
        modal.style.display = "none";
    }
}

// Inicialmente renderiza la tabla
renderTable();

