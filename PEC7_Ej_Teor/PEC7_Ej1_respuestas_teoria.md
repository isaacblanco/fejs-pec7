# Ejercicio 1

## a) ¿Qué es y cómo funciona el elemento <RouterLink> en Angular?

**RouterLink** es una directiva en Angular que se usa para crear enlaces dentro de una aplicación de una sola página (SPA). Funciona como un enlace HTML normal (a), pero en lugar de recargar la página, cambia la vista al componente correspondiente sin recargar el navegador.

Para usar **RouterLink**, lo enlazas a la ruta que quieres navegar:

```html
<a [routerLink]="['/ruta']">Ir a Ruta</a>
```

Esto actualiza la URL y muestra el componente asociado a esa ruta. Luego las rutas se tratan en el app-routing.module.ts

```typescript
const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "about", component: AboutComponent },
  { path: "**", component: PageNotFoundComponent },
];
```

Pongo el ejemplo de la ruta por defecto, con about, o en caso de no encontrarse.

## b) Explica la diferencia entre routerLink y routerLinkActive. ¿Qué otras directivas se pueden utilizar con el router en Angular?

**routerLink**: define la ruta a la que se navega cuando se hace clic en el enlace.
**routerLinkActive**: aplica clases CSS cuando el enlace está activo, ayudando a resaltar la ruta actual.

Ejemplo:

```html
<a [routerLink]="['/ruta']" routerLinkActive="active">Ir a Ruta</a>
```

Otras directivas con el router en Angular:

- **router-outlet**: marca el lugar en el que se cargan los componentes basados en la ruta.
- **routerLinkActiveOptions**: permite personalizar cuándo una ruta está activa.
- **routerLinkExact**: hace que la ruta activa sea exacta.

## c) Describe el servicio ActivatedRouteSnapshot. ¿Cómo se utiliza y en qué casos es útil?

**ActivatedRouteSnapshot** es una clase que representa el estado de una ruta en un momento específico. No cambia con la navegación. Útil para acceder a los datos de la ruta sin reaccionar a cambios futuros. Se utiliza en servicios y guardas para obtener información de la ruta.

Ejemplo:

```typescript
constructor(private route: ActivatedRoute) {
  const snapshot: ActivatedRouteSnapshot = route.snapshot;
  console.log(snapshot.params); // Accede a los parámetros de la ruta
}
```

## d) ¿Qué son las Route Guards? ¿Cómo se usan las guardas en Angular? Describe todas las guardas que existen en Angular (consulta para ello la documentación oficial de Angular)

Las **Route Guards** son servicios que controlan la navegación a una ruta. Se usan para proteger rutas, verificar permisos o cargar datos antes de mostrar un componente.

Tipos de guardas en Angular:

- **CanActivate**: controla si se permite la navegación a una ruta.
- **CanActivateChild**: controla si se permite la navegación a rutas hijas.
- **CanDeactivate**: controla si se permite salir de una ruta.
- **Resolve**: carga datos antes de que la ruta se active.
- **CanLoad**: controla si se permite cargar un módulo asíncrono.

Ejemplo:

```typescript
@Injectable({ providedIn: "root" })
class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(["/login"]);
      return false;
    }
  }
}
```

## e) ¿Qué es la carga Lazy de los módulos de Angular? ¿Cómo se configura en Angular la carga Lazy? https://angular.io/guide/lazy-loading-ngmodules

Según la ruta, la **carga diferida (Lazy)** es un patrón de diseño en Angular que implica cargar componentes, módulos u otros activos solo cuando son necesarios, en lugar de cargar todo por adelantado. Esto puede mejorar significativamente el tiempo de carga inicial de tu aplicación, lo que a su vez mejora la experiencia del usuario y el rendimiento general.

Para aplicar la carga diferida en los módulos de Angular, utilizamos loadChildren (en lugar de component) en la configuración de rutas en AppRoutingModule.

Ejemplo:

- Define el módulo para carga Lazy.
- Usa la función loadChildren en las rutas.

Ejemplo:

```typescript
const routes: Routes = [
  {
    path: "items",
    loadChildren: () =>
      import("./items/items.module").then((m) => m.ItemsModule),
  },
];
```

Además, hay que asegúrarsee de eliminar el módulo ItemsModule de AppModule. De esta manera, los módulos se cargarán solo cuando se necesiten, optimizando la carga inicial de la aplicación.

Otro ejemplo muy similar:

```typescript
const routes: Routes = [
  {
    path: "admin",
    loadChildren: () =>
      import("./admin/admin.module").then((m) => m.AdminModule),
  },
];
```

Esto carga el módulo AdminModule solo cuando se navega a la ruta /admin

## f) Compara las diferencias entre CanDeactivate y CanActivate guards en Angular. Proporciona ejemplos de cuándo se utilizaría cada uno.

- **CanActivate**: Controla el acceso a una ruta. Útil para proteger rutas.

Ejemplo: Evitar que usuarios no autenticados accedan a rutas privadas.

```typescript
@Injectable({ providedIn: "root" })
class AuthGuard implements CanActivate {
  canActivate(): boolean {
    return this.authService.isLoggedIn();
  }
}
```

- **CanDeactivate**: Controla si se permite salir de una ruta. Útil para evitar perder datos no guardados.
  Ejemplo: Prevenir que un usuario salga de un formulario sin guardar cambios.

```typescript
@Injectable({ providedIn: "root" })
class UnsavedChangesGuard implements CanDeactivate<FormComponent> {
  canDeactivate(component: FormComponent): boolean {
    return component.canDeactivate()
      ? true
      : confirm("Tienes cambios sin guardar. ¿Deseas salir?");
  }
}
```

## g) ¿Qué es/para qué son útiles los middlewares en el contexto de Angular? ¿Dónde estás usando middlewares en nuestra aplicación?

En Angular, no existen "middlewares" como en otros frameworks como Express.js. Sin embargo, se pueden usar interceptores y guardas como mecanismos similares. Los interceptores manejan las solicitudes HTTP, y las guardas controlan la navegación.

En nuestra aplicación, usamos interceptores para añadir tokens de autenticación a las solicitudes HTTP y guardas para proteger rutas y verificar permisos de usuario.

Ejemplo de interceptor

```typescript
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authToken = this.authService.getToken();
    const authReq = req.clone({
      headers: req.headers.set("Authorization", `Bearer ${authToken}`),
    });
    return next.handle(authReq);
  }
}
```

Ejemplo de guarda

```typescript
@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(["/login"]);
      return false;
    }
  }
}
```
