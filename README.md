# 🧵 Threado - Event-Driven Microservices Social Platform

![Java](https://img.shields.io/badge/Java-21-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.4-6DB33F?style=for-the-badge&logo=spring&logoColor=white)
![Angular](https://img.shields.io/badge/Angular-19-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![Kafka](https://img.shields.io/badge/Apache_Kafka-231F20?style=for-the-badge&logo=apachekafka&logoColor=white)
![Keycloak](https://img.shields.io/badge/Keycloak-EB5202?style=for-the-badge&logo=keycloak&logoColor=white)

**Threado** to zaawansowany klon Twittera zbudowany w architekturze mikroserwisów. System został zaprojektowany z myślą o wysokiej dostępności, asynchronicznej komunikacji oraz bezpiecznym logowaniu społecznościowym (Google OAuth2).

## 🏗️ Architektura Systemu

Projekt składa się z następujących modułów:

* **API Gateway**: Centralny punkt wejścia do systemu, odpowiedzialny za routing i bezpieczeństwo.
* **Discovery Server (Eureka)**: Rejestracja usług i Load Balancing.
* **Config Server**: Centralna konfiguracja (Spring Cloud Config).
* **User Service**: Logika biznesowa dotycząca profili i relacji użytkowników.
* **Thread Service**: Zarządzanie postami (tweetami) i interakcjami.
* **Notification Service**: Wysyłanie powiadomień w czasie rzeczywistym.
* **Auth Service (Keycloak)**: Serwer tożsamości obsługujący Google Social Login i JWT.
* **Message Broker (Kafka)**: Asynchroniczna komunikacja między serwisami.



---

## 🛠️ Stos Technologiczny (Tech Stack)

### Backend & Infrastructure
* **Java 21 & Spring Boot 3.4**: Rdzeń aplikacji.
* **Spring Cloud Gateway**: Dynamiczny routing i filtrowanie żądań.
* **Keycloak (OIDC)**: Pełna obsługa logowania przez Google.
* **Apache Kafka**: Obsługa zdarzeń (np. nowe powiadomienia, polubienia).
* **PostgreSQL**: Izolowane bazy danych dla każdego serwisu.
* **Docker & Docker Compose**: Pełna konteneryzacja środowiska.

### Frontend
* **Angular 19**: Nowoczesna aplikacja typu SPA (Single Page Application).
* **Tailwind CSS**: Stylowanie oparte na narzędziach (Utility-first).

---

## 🚀 Kluczowe Funkcje

* **Google Social Login**: Integracja Keycloak z Google Identity Provider.
* **Distributed Tracing**: Śledzenie przepływu żądań między serwisami.
* **Real-time Notifications**: Powiadomienia wypychane asynchronicznie przez Kafkę.
* **Centralized Configuration**: Zarządzanie profilami `native` i `git`.

---

## 🏁 Szybki Start (Docker)

Aby uruchomić całą infrastrukturę (Gateway, Eureka, Config, Keycloak, Bazy danych):

```bash
git clone [https://github.com/Kielbek/Threado.git](https://github.com/Kielbek/Threado.git)
cd Threado
docker compose up -d
```
Dashboardy:

Eureka Server: http://localhost:8761

Keycloak Admin: http://localhost:8180

Config Server: http://localhost:8888

👤 Autor

Mateusz Kiełbasa - GitHub

Portfolio: mateuszkielbasa.dev

