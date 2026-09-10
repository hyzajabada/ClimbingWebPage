<!-- doc-meta
type: ticket
ticket: T-001
created: 2026-09-10
last-verified: 2026-09-10
shelf-life: durable
-->

# T-001 — Makiety wizualne strony trenera

Status: review
Blocked-by:

## Po co

Klient jest zawodowym trenerem wspinaczki i potrzebuje strony-wizytówki. Nie ma dokumentu
wymagań ani ustalonej treści. Zanim cokolwiek ustalimy, trzeba **pokazać**, jak taka strona
może wyglądać, i wybrać kierunek. Dopiero na wybranym kierunku będziemy ustalać treść,
sekcje i funkcje.

Kod ma być czytelny i możliwy do utrzymania bez znajomości frameworków frontendowych.

## Zakres

Trzy kompletne, niezależne strony w trzech różnych kierunkach wizualnych, plus strona
wyboru, która je zestawia. Identyczna struktura sekcji w każdym wariancie, żeby porównanie
dotyczyło wyłącznie szaty graficznej.

Kierunki:

| Wariant | Nazwa | Charakter |
|---|---|---|
| A | Skała | Ciemny, kinowy. Grafit, bursztynowy akcent, wielkie cienkie nagłówki, parallax. |
| B | Wapień | Jasny, redakcyjny. Złamana biel, zieleń, szeryfowe nagłówki, dużo powietrza. |
| C | Chwyt | Sportowy, kontrastowy. Czerń, limonka, gigantyczna typografia, marquee. |

Sekcje w każdym wariancie: hero, o mnie, metoda pracy, oferta (sesje 1:1 oraz rozpiski
treningowe), cennik, opinie, terminy, kontakt, stopka.

## Ustalenia wiążące

- **Tylko zajęcia indywidualne i rozpiski.** Klient nie prowadzi grup. Makieta nie może
  sugerować oferty grupowej.
- **Treść to placeholdery.** Wiarygodny polski tekst, żeby dało się ocenić kompozycję, ale
  nic z tego nie jest zatwierdzone. Treść docelową napisze klient.
- **Zero zdjęć.** W miejscach na fotografie idą oznaczone ramki opisujące, jakiego zdjęcia
  potrzeba. Powód: licencje na stocki to problem, którego nie chcemy.
- **Bez build stepu.** Czysty HTML, CSS i waniliowy JavaScript. Ma się otwierać z dysku i
  hostować na czymkolwiek.
- **Formularz kontaktowy jest wizualny.** Nie wysyła. Strona statyczna nie ma backendu, a
  wybór usługi to osobna decyzja.
- **Kalendarz jest atrapą.** Pokazuje, jak moduł terminów mógłby wyglądać. Rezerwacje to
  osobny ticket.
- Treść strony po polsku, kod po angielsku, zgodnie z `AGENTS.md`.

## Poza zakresem

Prawdziwa treść, zdjęcia, obsługa formularza, rezerwacje online, płatności, blog, wersje
językowe, hosting i domena, SEO poza podstawowymi metatagami.

## Test

Brak runnera w repozytorium (patrz `docs/agents/testing.md`). To makieta bez logiki
biznesowej: cała weryfikacja polega na otwarciu stron i obejrzeniu ich w przeglądarce, w
tym na szerokości telefonu. Automatyzacja zostanie zaproponowana przy pierwszej zmianie,
która wprowadzi zachowanie warte przypięcia testem.

## Podgląd  <!-- dated: 2026-09-10 -->

Makiety są wystawione na GitHub Pages: <https://hyzajabada.github.io/ClimbingWebPage/>

Serwowane z gałęzi `main`, katalog `/`. Każdy push publikuje się sam, bez klikania.
Repozytorium jest publiczne, bo Pages tego wymaga na darmowym planie. Strony mają
`noindex`, więc nie trafiają do wyszukiwarek.

Lokalnie: `python -m http.server 8090`, potem `http://localhost:8090`.

## Pytania do klienta

Zbierane w trakcie. Do zadania po obejrzeniu makiet:

1. Który wariant wizualny.
2. Zdjęcia własne czy sesja u fotografa. Bez dobrych zdjęć wariant ciemny się sypie.
3. Jakie są realne stawki i czy mają być pokazywane publicznie.
4. Czy są opinie podopiecznych, których można użyć z imienia.
5. Czy kalendarz ma pokazywać wolne terminy, czy tylko formularz zapytania.
6. Jakie uprawnienia i tytuły wymienić.
7. Gdzie prowadzone są zajęcia i czy ma to być na stronie.
