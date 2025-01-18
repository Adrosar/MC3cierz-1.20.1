# MC3cierz

Minecraft 1.20.1 + Forge + modyfikacje głownie techniczne.



## Pobieranie

###  Forge 47.2.0

Paczka _client + server_ oparta o **Minecraft 1.20.1** oraz **Forge 47.2.0**

| System                         | Wersja | Link                                                         | Hasło                        |
| ------------------------------ | ------ | ------------------------------------------------------------ | ---------------------------- |
| Windows 10 x64                 | 0.0.1  | ↓                                                            | 6vtUabMVgqu%uAx$baz#w7B@9bHb |
| Windows 10 x64                 | 0.0.2  | ↓                                                            | 3EYn%ImGO&nzdTZRTZG@58M#wQF4 |
| Windows 10 x64                 | 0.0.3  | ↓                                                            | 8#3kc^Cr6LWjXN%pZFmd37naBfyd |
| Windows 10 x64 & Fedora 40 x64 | 0.0.4  | [Mega](https://mega.nz/folder/0dlEHQxD#XlV8UWwhdrhRl9CNyrREvg) | CR53c#MeMX52u&d9fyx%pCX^RvCH |

### Forge 47.3.10

Paczka _client + server_ oparta o **Minecraft 1.20.1** oraz **Forge 47.3.10**.

Od teraz paczki będą wersjonowane wedle **CalVer**, a nie **SemVer** jak to miało miejsce wcześniej.

| System                                                       | Wersja                        | Link                                                         | Hasło                            |
| ------------------------------------------------------------ | ----------------------------- | ------------------------------------------------------------ | -------------------------------- |
| Windows 10 x64 & Fedora 40 x64                               | 2024.10.08                    | ↓                                                            | VJ6bhXa@3zEJY#AsXx8$VZJjx%rYm5a3 |
| Windows 10 x64 & Fedora 40 x64 & MasOS Sonoma (Apple Silicon M1) | 2025.01.18 (najnowsza wersja) | [Mega](https://mega.nz/folder/0dlEHQxD#XlV8UWwhdrhRl9CNyrREvg) | C8qPAcb4#vuu3rzX!zbxGTM@4X3IUe$q |



## Jak uruchomić grę?



### Windows

System: Windows 10 x64 | Sprzęt: komputer z procesorem 64 bitowym

1. Pobierz najnowszą paczkę i wypakuj do lokalizacji `C:\Games\MC3cierz`
2. Uruchom plik `C:\Games\MC3cierz\client.hta` poprzez dwukrotne kliknięcie
3. Wpisz nazwę użytkownika i naciśnij klawisz ENTER
4. Gotowe! Teraz wpisz nazwę użytkownika i naciśnij klawisz ENTER



### MacOS

System: MacOS Sonoma 14.2.1 | Sprzęt: MacBook M1 Pro

1. W głównym katalogu użytkownika (czyli katalog domowym) utwórz folder **Games**
2. Pobierz najnowszą paczkę i wypakuj go do wcześniej utworzonego folderu **Games**
3. Nadaj uprawnienia do uruchamiania pliku `client.zsh` wykonując poniższe kroki
   1. Uruchom terminal
   2. Wykonaj polecenie `cd $HOME/Games/MC3cierz`
   3. Wykonaj polecenie `sudo chmod +x client.command`
4. Uruchomienie gry
   1. Otwórz **Finder** i przejdź do folderu **Games**, a następnie do **MC3cierz** 
   2. Uruchom plik `client.command` poprzez dwukrotne kliknięcie
5. Gotowe! Teraz wpisz nazwę użytkownika i naciśnij klawisz ENTER



### Linux

System: Fedora 10 x64 | Sprzęt: komputer z procesorem 64 bitowym

1. Utwórz folder gdzie zostanie umieszczona gra
   1. Uruchom terminal
   2. Wykonaj polecenie `mkdir -p $HOME/.var/game`
2. Pobierz najnowszą paczkę i wypakuj do lokalizacji `$HOME/.var/game`
3. Nadaj uprawnienia do uruchamiania dla wymaganych plików
   1. Uruchom terminal
   2. Wykonaj polecenia
      1. `cd $HOME/.var/game/MC3cierz`
      2. `chmod +x runtime/node-v20.14.0-linux-x64/bin/node`
      3. `chmod +x runtime/openjdk-jre-17.0.12+7-linux-x64/bin/java`
      4. `chmod +x client.sh`
4. Uruchamianie gry
   1. Uruchom terminal
   2. Wykonaj polecenie `$HOME/.var/game/MC3cierz/client.sh`
5. Gotowe! Teraz wpisz nazwę użytkownika i naciśnij klawisz ENTER
