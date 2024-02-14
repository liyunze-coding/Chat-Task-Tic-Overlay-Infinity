# Multi-Task Widget

Multi-Task Widget is a task widget that allows you to add multiple tasks at one time!

Want acccess to the multi-task widget for your stream? Buy it on <a href="https://ko-fi.com/s/94e7e8dc81" target="_blank">Ko-Fi</a>

Join the <a href="https://discord.gg/UnHyHkhbga" target="_blank">Discord server</a>!

[Spanish translation](#Widget-de-Tareas-Múltiples)

---

# Follow the creator of the bot!

Hi! I frequently stream co-working & study so please drop a follow if you enjoy using the task bot, thank you <3

-   <a target="_blank" href="https://www.twitch.tv/RythonDev">https://twitch.tv/RythonDev</a>

If you like my work, consider supporting me on ko-fi!

-   <a target="_blank" href="https://www.ko-fi.com/Rython">https://ko-fi.com/Rython</a>

# Basic commands

`()` : optional, if there's only 1 incomplete task

`[]` : required

-   `!taskhelp` : shows the help message
-   `!add [task]` : add the task to your list
-   `!focus (index / task)` : focus on ONE task
-   `!edit (index) [task]` : edit the task at the specified index
-   `!done (index / task)` : mark task as done
-   `!undone (index / task)` : mark task as incomplete
-   `!remove (index / task)` : remove task from list
-   `!check (@user)` : check (your own / mentioned user's) incomplete tasks
-   `!mytasks` : check your own incomplete tasks
-   `!count (@user)` : check (your own / mentioned user's) completed task count
-   `!boardcount` : check how many tasks have been completed by everyone in chat
-   `!points (@user)` : check how many points (you / mentioned user) earned

## Tips:

-   You can add/remove/mark complete several tasks in 1 command!
-   When you focus on a task, not only will it be highlighted on the widget, but the selected task will be given priority when you do `!done`

## Multiple tasks in one command

### Add command

-   `!add task 1, task 2, task 3`

### Remove command

-   `!remove task 1, task 2, task 3` (specify task names)
-   `!remove 1, 2, 3` (specify task indexes/indices)
-   `!remove 1 2 3` (specify task indexes/indices without commas)

### Done command

-   `!done task 1, task 2, task 3` (specify task names)
-   `!done 1, 2, 3` (specify task indexes/indices)
-   `!done 1 2 3` (specify task indexes/indices without commas)
-   `!done all`

# Admin commands

## Mod only

-   `!adel @user` : clears all tasks of the mentioned user

## Streamer only

-   `!clearall` : clears all tasks and count
-   `!cleartasks` : clears all tasks\*
-   `!cleardone` : clears all done tasks\*
-   `!clearns` : clear all tasks excluding streamer's incomplete tasks\*
-   `!resetboardcount` : resets the board count, individual users' task count won't be affected
-   `!resetuserscount` : resets users' task count, board count won't be affected
-   `!setboardcount [integer]` : set the board count to [integer], users' task count won't be affected

\* count won't be affected at all

---

# Widget de Tareas Múltiples

El Widget de Tareas Múltiples es un widget de tareas que te permite agregar múltiples tareas a la vez.

¿Quieres acceso al widget para tu transmisión? ¡Únete al [servidor de Discord](https://discord.gg/UnHyHkhbga)!

---

# Sigue al creador del bot

¡Hola! Transmito frecuentemente co-working y estudio, así que por favor sígueme si disfrutas usando el bot de tareas, ¡gracias <3!

-   [https://www.twitch.tv/RythonDev](https://www.twitch.tv/RythonDev)

Si te gusta mi trabajo, considera apoyarme en ko-fi!

-   [https://www.ko-fi.com/Rython](https://www.ko-fi.com/Rython)

# Comandos básicos

`()` : opcional, si hay solo 1 tarea incompleta

`[]` : requerido

-   `!taskhelp` : muestra el mensaje de ayuda
-   `!add [tarea]` : agrega la tarea a tu lista
-   `!focus (índice / tarea)` : enfócate en UNA tarea
-   `!edit (índice) [tarea]` : edita la tarea en el índice especificado
-   `!done (índice / tarea)` : marca la tarea como hecha
-   `!undone (índice / tarea)` : marca la tarea como incompleta
-   `!remove (índice / tarea)` : elimina la tarea de la lista
-   `!check (@usuario)` : verifica las tareas incompletas (propias / del usuario mencionado)
-   `!mytasks` : verifica tus propias tareas incompletas
-   `!count (@usuario)` : verifica el número de tareas completadas (propias / del usuario mencionado)
-   `!boardcount` : verifica cuántas tareas han sido completadas por todos en el chat
-   `!points (@usuario)` : verifica cuántos puntos (tú / usuario mencionado) ha ganado

## Consejos:

-   ¡Puedes agregar/eliminar/marcar como completas varias tareas en 1 comando!
-   Cuando te enfocas en una tarea, no solo se resaltará en el widget, sino que la tarea seleccionada tendrá prioridad cuando uses `!done`

## Múltiples tareas en un solo comando

### Comando de Agregar

-   `!add tarea 1, tarea 2, tarea 3`

### Comando de Eliminar

-   `!remove tarea 1, tarea 2, tarea 3` (especifica nombres de tareas)
-   `!remove 1, 2, 3` (especifica índices de tareas sin nombres)
-   `!remove 1 2 3` (especifica índices de tareas sin comas)

### Comando de Completar

-   `!done tarea 1, tarea 2, tarea 3` (especifica nombres de tareas)
-   `!done 1, 2, 3` (especifica índices de tareas sin nombres)
-   `!done 1 2 3` (especifica índices de tareas sin comas)
-   `!done all`

# Comandos de Administrador

## Solo para Moderadores

-   `!adel @usuario` : borra todas las tareas del usuario mencionado

## Solo para el Streamer

-   `!clearall` : borra todas las tareas y el conteo
-   `!cleartasks` : borra todas las tareas\*
-   `!cleardone` : borra todas las tareas completadas\*
-   `!clearns` : borra todas las tareas excluyendo las tareas incompletas del streamer\*
-   `!resetboardcount` : reinicia el conteo del tablero, el conteo de tareas de los usuarios individuales no se verá afectado
-   `!resetuserscount` : reinicia el conteo de tareas de los usuarios, el conteo del tablero no se verá afectado
-   `!setboardcount [entero]` : establece el conteo del tablero a [entero], el conteo de tareas de los usuarios no se verá afectado

\* el conteo no se verá afectado en absoluto
