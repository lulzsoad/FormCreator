# FormCreator
TypeScript project

demo: <a href="https://lulzsoad.github.io/FormCreator/index.html" target="_blank">FormCreator</a>

# Działanie aplikacji

Aplikacja ma za zadanie dynamiczne tworzenie formularzy, które są zapisywane do Local Storage przeglądarki internetowej.<br><br>
Główna strona <i>(index.html)</i> zawiera sekcje tworzenia formularza oraz podglądu widoku formularza. Po zapisaniu formularza, użytkownik ma możliwość podglądu oraz wypełnienia zapisanych formularzy klikając w pozycję "Lista formularzy" <i>(form-list.html)</i>.<br><br>
Wypełnione formularze generują dokumenty, które można podejrzeć pod pozycją "Lista dokumentów" <i>document-list.html</i>. Sekcja ta zawiera również funkcjonalność edycji dokumentu.<br><br>

# Instrukcja obsługi aplikacji
<h3>Opis pól tworzenia formularza</h3>
<ul>
	<li><b>Nazwa forumularza</b>* - Jest to nazwa formularza, który aktualnie tworzy użytkownik. Po dodaniu pierwszego pola funkcja edycji nazwy formularza zostaje wyłączona </li>
	<li><b>Etykieta</b>* - Nazwa pola, które aktualnie tworzy użytkownik. Program nie wykrywa duplikujących się nazw, z tego względu zalecane jest zwracanie uwagi na powtarzające się nazwy etykied pól</li>
	<li><b>Typ pola</b>* - Typ pola, które aktualnie tworzy użytkownik, do wyboru jest 6 typów pól (pole jednolinijkowe, pole tekstowe, data, email, lista rozwijana, checkbox) w zależności od wymaganej preferencji wprowadzania danych</li>
	<li><b>Nazwa</b>** - Unikalna nazwa pola. Należy zwracać uwagę na powtarzające się nazwy pól. Jest to nazwa atrybutu <i>input</i> w HTML w tagu <i>form</i></li>
	<li><b>Domyślna wartość</b> - Domyślna wartość wyświetlana w tworzonym polu formularza</li>
	<li><b>Liczba opcji</b>*** - Liczba opcji do wyświetlania w liście rozwijanej</li>
	<li><b>Dodaj</b> - Przycisk dodania pola do formularza.</li>
</ul>

\* - pole wymagane<br>
\** - zakazane używanie tej samej nazwy pól. (Jeżeli w poprzednim polu użytkownik nadał nazwę <i>name</i>, w aktualnym polu nazwa nie może być taka sama. Należy w takim wypadku użyć nazwy <i>name1</i> lub <i>secondName</i>. W przeciwnym wypadku formularz nie będzie działął prawidłowo.<br>
\*** - Opjca włączona tylko w sytuacji tworzenia pola typu <i>Lista rozwijana</i><br><br>

Aplikacja po dodaniu pola na bieżąco będzie wyświetlać podgląd tworzonego formularza. Jeżeli formularz jest gotowy, użytkownik może zapisać formularz kilkając na przycisk <b>"Zapisz formularz"</b>
