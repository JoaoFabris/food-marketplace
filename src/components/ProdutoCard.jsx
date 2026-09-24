const IMAGEM_PADRAO = 'https://placehold.co/400x300?text=Sem+Imagem';

function ProdutoCard({ produto }) {
  return (
    <div className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <img
        src={produto.imagem || IMAGEM_PADRAO}
        alt={produto.nome}
        className="w-full h-40 object-cover"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = IMAGEM_PADRAO;
        }}
      />
      <div className="p-4">
        <span className="text-xs font-medium text-food-primary bg-orange-50 px-2 py-0.5 rounded-full">
          {produto.categoria}
        </span>
        <h3 className="font-semibold text-food-dark mt-2">{produto.nome}</h3>
        <p className="font-bold text-lg text-food-dark mt-1">
          R$ {produto.preco.toFixed(2)}
        </p>
      </div>
    </div>
  );
}

export default ProdutoCard;
