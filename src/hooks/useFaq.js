export const useFaq = () => {
    const questions = [
        {
            number: 1,
            text: 'Quais os benefícios da Cooperativa de Energia?',
            answer: 'Como cooperado, você terá redução nos custos com energia e receberá energia renovável. Tudo isso com investimento zero e sem alterações físicas no seu negócio.'
        },
        {
            number: 2,
            text: 'Preciso fazer algum investimento?',
            answer: 'Não. O investimento é zero. A Cooperativa recebe apenas uma taxa de adesão por empresa (CNPJ). Caso sua empresa resolva sair da Cooperativa, esse valor é devolvido integralmente.'
        },
        {
            number: 3,
            text: 'O que é necessário para participar da Cooperativa?',
            answer: 'É necessário um gasto mensal médio acima de R$2.000,00 em energia.'
        },
        {
            number: 4,
            text: 'Como faço se minha empresa quiser sair da Cooperativa? É cobrado multa?',
            answer: 'É simples! Pedimos apenas que nos avise com 6 meses de antecedência e nenhuma multa é cobrada. Você volta a receber energia da distribuidora automaticamente.'
        },
        {
            number: 5,
            text: 'Se houver algum problema ou indisponibilidade momentânea na usina, ficarei sem energia?',
            answer: 'Não. O fornecimento de energia permanece de responsabilidade da distribuidora local (Copel, Energisa, Enel, entre outras). Assim, sua empresa continua a receber energia normalmente mesmo caso haja alguma indisponibilidade momentânea com nossas usinas.'
        },
        {
            number: 6,
            text: 'Se a Cooperativa não gerar os créditos de energia em algum mês, o que acontece?',
            answer: 'Você pagará sua conta de luz para a distribuidora, com os mesmos valores e da mesma forma que fazia antes de ser um cooperado da Sion Energia.'
        },
    ]

    return questions
}