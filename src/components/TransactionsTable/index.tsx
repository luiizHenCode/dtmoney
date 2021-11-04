import { useEffect, useState } from "react";
import { format } from "date-fns";
import { pt, ptBR } from "date-fns/locale";

import { Container } from "./styles";

import { api } from "../../services/api";

interface ITransactions {
  id: number;
  title: string;
  amount: number;
  type: string;
  category: string;
  createdAt: Date;
}

export function TransactionsTable() {
  const [transactions, setTransactions] = useState<ITransactions[]>(
    [] as ITransactions[]
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("transactions")
      .then((response) => {
        setTransactions(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return (
    <Container>
      {loading ? (
        <span>Carregando...</span>
      ) : (
        <table>
          <thead>
            <tr>
              <th style={{ width: "45%" }}>Título</th>
              <th>Valor</th>
              <th>Categoria</th>
              <th>Data</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((transaction) => {
              const date = new Date(transaction.createdAt);
              const formattedDate = format(date, "dd/MM/yyyy", {
                locale: ptBR,
              });

              return (
                <tr key={transaction.id}>
                  <td>{transaction.title}</td>
                  <td className={transaction.type}>
                    {`${transaction.type === "withdraw" ? "-" : ""}R$${
                      transaction.amount
                    }`}
                  </td>
                  <td>{transaction.category}</td>
                  <td>{formattedDate}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </Container>
  );
}
