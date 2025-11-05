const partners = [
  {
    id: 1,
    name: "Partner Company 1",
    logo: "/partners1.jpg",
  },
  {
    id: 2,
    name: "Partner Company 2",
    logo: "/partners2.gif",
  },
  {
    id: 3,
    name: "Partner Company 3",
    logo: "/partners3.gif",
  },
  {
    id: 4,
    name: "Partner Company 4",
    logo: "/partners4.jpg",
  },
  {
    id: 5,
    name: "Partner Company 5",
    logo: "/partners5.jpg",
  },
  {
    id: 6,
    name: "Partner Company 6",
    logo: "/partner6.jpg",
  },
]

export function PartnersSection() {
  return (
    <section id="partners" className="py-10 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="mb-6 text-center">
          <h2 className="text-4xl font-bold mb-2">
            <span className="text-foreground">OUR </span>
            <span className="text-primary">PARTNERS</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="flex items-center justify-center p-6 bg-background rounded-lg hover:shadow-lg transition-shadow group"
            >
              <img
                src={partner.logo || `/placeholder.svg?height=80&width=120&query=${partner.name}`}
                alt={partner.name}
                className="max-h-20 w-auto object-contain transition-all"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
