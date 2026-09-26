type Prioridad = "Alta" | "Media" | "Baja";

interface ITarea {
  readonly id: number;
  titulo: string;
  prioridad: Prioridad;
  completada: boolean;
  descripcion?: string;
}

class GestorTareas {
  private tareas: ITarea[];

  constructor() {
    this.tareas = [];
  }

  public agregarTarea(tarea: ITarea): void {
    this.tareas.push(tarea);
  }

  public completarTarea(id: number): void {
    const tareaEncontrada = this.tareas.find(
      (tarea) => tarea.id === id
    );

    if (tareaEncontrada) {
      tareaEncontrada.completada = true;
    } else {
      console.log(`No se encontró la tarea con ID ${id}`);
    }
  }

  public listarPendientes(): void {
    console.log("=== TAREAS PENDIENTES ===");

    const tareasPendientes = this.tareas.filter(
      (tarea) => !tarea.completada
    );

    tareasPendientes.forEach((tarea) => {
      const descripcion = tarea.descripcion
        ? ` - Desc: ${tarea.descripcion}`
        : "";

      console.log(
        `[ID: ${tarea.id}] ${tarea.titulo} (${tarea.prioridad})${descripcion}`
      );
    });
  }
}

const gestor = new GestorTareas();

gestor.agregarTarea({
  id: 1,
  titulo: "Configurar tsconfig.json",
  prioridad: "Alta",
  completada: false
});

gestor.agregarTarea({
  id: 2,
  titulo: "Crear modelos",
  prioridad: "Media",
  completada: false,
  descripcion: "Definir esquemas iniciales"
});

gestor.listarPendientes();
gestor.completarTarea(1);
gestor.listarPendientes();
