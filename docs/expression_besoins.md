# Expression des besoins – Projet ShieldBackup

## 1. Contexte et problématique

Dans une infrastructure informatique, plusieurs serveurs assurent des services essentiels : hébergement de sites web, bases de données, journaux systèmes, applicatifs métiers, etc. La perte des données présentes sur ces serveurs peut avoir des conséquences importantes : indisponibilité de services, perte d’informations, difficulté à retracer des événements ou à restaurer une configuration fonctionnelle.

Actuellement, les sauvegardes éventuelles sont réalisées de façon manuelle ou partielle, sans outil centralisé permettant de superviser l’ensemble. Il n’existe pas de mécanisme homogène permettant de définir clairement ce qui doit être sauvegardé, avec quelle fréquence, ni de vérifier rapidement si les sauvegardes se déroulent correctement. De plus, il n’y a pas de vision globale de l’historique des sauvegardes ni de l’espace disque consommé.

Le projet **ShieldBackup** a pour objectif de répondre à ces besoins en proposant un système de sauvegarde décentralisé, doté d’un serveur central chargé de recevoir et de organiser les archives, et d’une interface web permettant à un administrateur de piloter et de superviser les sauvegardes. Le projet est également un support pédagogique : il sert de fil rouge pour mettre en œuvre la méthode **Unified Process** dans le cadre de la SAE.

---

## 2. Objectifs généraux du système

L’objectif principal de ShieldBackup est de permettre à un administrateur système de protéger les données critiques de plusieurs serveurs distants en mettant en place des sauvegardes régulières, automatisées et supervisables. Le système doit offrir à l’administrateur un moyen simple de :

- déclarer les serveurs à sauvegarder,
- choisir précisément les répertoires et fichiers à inclure dans chaque sauvegarde,
- définir la fréquence d’exécution des sauvegardes,
- conserver un historique structuré des archives grâce à une politique d’échantillonnage,
- suivre en temps réel l’état des sauvegardes et l’utilisation de l’espace disque.

Au-delà de ces fonctionnalités, le système doit apporter une vision claire et synthétique de la **santé globale des sauvegardes** : quelles sauvegardes ont réussi, lesquelles ont échoué, quels serveurs sont correctement couverts, et si des risques existent (par exemple, espace disque presque saturé).

---

## 3. Acteur et usage prévu

Le système est conçu pour être utilisé par un **administrateur**. Cet administrateur est une personne disposant des droits nécessaires pour :

- accéder à l’interface web de ShieldBackup,
- configurer les serveurs,
- définir les paramètres de sauvegarde,
- consulter les rapports et journaux.

Il n’y a pas d’utilisateur “standard” ni de compte invité : le système n’est pas destiné à un usage grand public, mais à une utilisation interne par une personne technique responsable de l’infrastructure. Toute la conception du système (interface, vocabulaire, messages) est donc orientée vers cet administrateur unique.

---

## 4. Besoins fonctionnels

### 4.1. Déclaration et paramétrage des serveurs à sauvegarder

L’un des premiers besoins consiste à pouvoir **déclarer les serveurs à sauvegarder** dans le système. L’administrateur doit pouvoir créer une fiche pour chaque serveur, en indiquant au minimum son adresse (IP ou nom DNS), un nom ou une étiquette (par exemple “Serveur web 1” ou “Base de données”), et les informations nécessaires à la connexion SSH (utilisateur, clé publique/privée).

Une fois le serveur déclaré, l’administrateur doit pouvoir le paramétrer. Cela comprend la **sélection des répertoires à sauvegarder** : par exemple `/etc` pour les fichiers de configuration, `/var/log` pour les journaux, ou encore des répertoires applicatifs spécifiques. La granularité doit être suffisante pour que l’administrateur ne soit pas obligé de sauvegarder tout le système mais puisse choisir uniquement les éléments intéressants.

Dans certains cas, certaines applications doivent être arrêtées pendant l’opération de sauvegarde (serveur web, base de données…) pour garantir la cohérence des données. Le besoin comprend donc la possibilité de **définir des services à arrêter et à relancer** automatiquement autour de la sauvegarde. Pour chaque serveur, l’administrateur pourra ainsi indiquer quels services doivent être stoppés avant l’archive, puis redémarrés une fois l’archive réalisée et envoyée.

### 4.2. Planification et déclenchement des sauvegardes

Le système doit permettre de **planifier les sauvegardes** de manière automatique. L’administrateur doit pouvoir choisir une fréquence (par exemple une sauvegarde quotidienne à une heure donnée) et éventuellement une granularité plus fine (hebdomadaire, mensuelle, etc.). Cette planification permet de s’assurer que les sauvegardes ont lieu régulièrement, sans intervention humaine, et de réduire le risque d’oubli.

En complément de la planification automatique, l’administrateur doit pouvoir **déclencher manuellement une sauvegarde ponctuelle** pour un serveur donné. Cette fonction est utile, par exemple, avant une mise à jour importante ou une modification sensible de la configuration. Le système doit alors traiter cette sauvegarde manuelle de la même façon qu’une sauvegarde planifiée (arrêt des services, création de l’archive, envoi au serveur central, mise à jour de l’historique).

### 4.3. Gestion des archives et politique d’échantillonnage

Les sauvegardes sont stockées sous forme d’archives (fichiers compressés) sur un **serveur de sauvegarde central**. Le système doit organiser ces archives de manière claire, en les classant par serveur, par date et éventuellement par type (quotidienne, hebdomadaire, mensuelle). L’administrateur doit pouvoir comprendre facilement quelle archive correspond à quelle sauvegarde.

Afin de maîtriser l’espace disque utilisé, il est nécessaire de mettre en place une **politique d’échantillonnage**. Cette politique consiste à conserver un certain nombre de sauvegardes récentes (par exemple les 7 dernières journalières), puis à ne garder que certaines sauvegardes plus anciennes (par exemple 4 sauvegardes hebdomadaires, 12 mensuelles, etc.). Le besoin fonctionnel est donc que le système soit capable, de manière automatique, de supprimer ou d’archiver les sauvegardes les plus anciennes en respectant ces règles, tout en garantissant la présence d’un historique suffisant pour la restauration.

### 4.4. Supervision, historique et suivi de l’espace disque

Un besoin essentiel est la **supervision** des sauvegardes. L’administrateur doit disposer, via l’interface web, d’un tableau de bord permettant de visualiser rapidement l’état des dernières opérations : quelles sauvegardes ont été exécutées, sur quels serveurs, à quelle date, et avec quel résultat (succès ou échec). En cas de problème (erreur de connexion, espace disque insuffisant, service impossible à arrêter…), le système doit l’indiquer de façon claire.

En plus de l’état instantané, l’administrateur doit pouvoir consulter un **historique détaillé** des sauvegardes pour un serveur donné. Cet historique doit permettre de voir l’évolution dans le temps, d’identifier les échecs répétés et d’analyser la fiabilité du processus.

Le système doit aussi fournir une **vision de l’espace disque** utilisé sur le serveur de sauvegarde : capacité totale, espace utilisé, espace restant, éventuellement des seuils d’alerte. Ce besoin est important pour anticiper les risques de saturation et ajuster, si nécessaire, la politique d’échantillonnage ou la taille des sauvegardes.

---

## 5. Exigences non fonctionnelles et contraintes

Au-delà des fonctionnalités pures, plusieurs exigences non fonctionnelles sont associées à ShieldBackup.

La première est la **sécurité**. Toutes les communications entre le serveur de sauvegarde et les serveurs distants doivent se faire via SSH, avec authentification par clés, afin d’éviter l’usage de mots de passe en clair. Seul l’administrateur doit avoir accès à l’interface de gestion ; l’application devra donc être hébergée de manière sécurisée et éventuellement protégée par un mécanisme d’authentification.

La seconde est la **robustesse**. Le système doit être capable de gérer proprement les erreurs : serveur distant inaccessible, service impossible à arrêter, manque d’espace disque, etc. Ces erreurs ne doivent pas provoquer un plantage silencieux ; elles doivent être enregistrées et visibles dans l’interface de supervision afin que l’administrateur puisse intervenir.

La troisième relève de la **maintenabilité** et de l’aspect pédagogique. Le système sera construit à partir de scripts Bash, d’un serveur NodeJS/Fastify et de templates EJS pour l’interface. L’architecture doit rester suffisamment claire et modulaire pour être comprise, modifiée et améliorée par les membres du groupe ou par d’autres étudiants.

Enfin, le projet s’inscrit dans un cadre contraint : il doit être développé sur des **machines virtuelles** (au minimum un serveur de sauvegarde et un serveur distant), avec les outils imposés par la SAE (GitHub pour le versionnement, ProjectLibre pour le Gantt, BoUML ou équivalent pour les diagrammes UML, etc.). Ces contraintes techniques font partie intégrante du besoin.

---

## 6. Conclusion sur les besoins

L’expression des besoins présentée ici a pour but de cadrer précisément le fonctionnement attendu de ShieldBackup avant le début de la conception détaillée et de l’implémentation. Elle formalise ce que le système doit permettre à l’administrateur de faire, dans quelles conditions et avec quels objectifs (protection des données, supervision, automatisation, sécurité).

Ce document servira de référence pour la suite du projet, notamment pour la réalisation des diagrammes UML (cas d’usage, séquence), pour le choix de l’architecture, puis pour la planification des tâches dans le cadre de la méthode Unified Process.

