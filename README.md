# OnyLan

## Installation de l'environnement de développement

### NVM (Gestionnaire de versions Node)

Télécharger et installer la dernière version de [nvm-setup.exe](https://github.com/coreybutler/nvm-windows/releases).

Ouvrez un terminal et exécutez les commandes suivantes :

```bash
nvm install 20.12.2
nvm use 20.12.2
```

Node est donc installer en version 20.12.2

Pour voir la liste des version de Node installer vous pouvez faire la commande :

```bash
nvm list
```

### Clonage du dépôt

```bash
git clone https://github.com/MDelmont/onylanBack.git
```


### Installation de l'environnement backend

Documentation: https://www.prisma.io/docs/orm/reference/prisma-client-reference

Accédez au dossier back nommé OnyLanBack.

```bash
cd Onylan/OnyLanBack
```

Utilisez la commande :

```bash
npm install
```

Lancez le serveur :

```bash
npm run start
```

### Installation de mysql

https://www.mamp.info/en/downloads/

Download version 5.0.6 pour Windows

Lancer l'executable - installer - ouvrir mamp - lancer le serveur

### Creer nouvelle base et nouvel utilisateur 

Click sur openWebStart page - click sur le lien vers phpmyadmin
Ici, créer une nouvelle base de donnée (je l'ai appelé OnyLan)
Ensuite créer un nouvel utilisateur (comptes utilisateurs - ajouter un compte d'utilisateur)
Perso j'ai mis username: ony, password: onyadmin, privilèges globaux: tout cocher - Exécuter
Ensuite, comptes utilisateurs - click sur ony - base de données - une par une j'ai donné tous les privilèges. Comme ça l'utilisateur est en superadmin sur tout le mysql, on aura aucun soucis.

### Mettre en place la base grâce à Prisma

A la racine de OnyLanBack, créer un fichier .env et mettez ceci dedans: (si vous avez garder les mêmes identifiants/password que moi)
DATABASE_URL="mysql://ony:onyadmin@localhost:3306/onylan"

lancer la commande suivante pour mettre à jour la base de donnée: (c'est une migration et --name c'est pour donner un nom à la migration)
npx prisma migrate dev --name first_test
