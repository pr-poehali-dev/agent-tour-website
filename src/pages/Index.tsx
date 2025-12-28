import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

interface Tour {
  id: number;
  title: string;
  country: string;
  price: number;
  duration: string;
  type: string;
  image: string;
  description: string;
  dates: string[];
}

const tours: Tour[] = [
  {
    id: 1,
    title: 'Райские Мальдивы',
    country: 'Мальдивы',
    price: 150000,
    duration: '7 дней',
    type: 'Пляжный отдых',
    image: 'https://cdn.poehali.dev/projects/4e746274-77a9-4bb4-aa47-be7d41230011/files/22f30c01-9751-4c98-ac79-a1ea08c95295.jpg',
    description: 'Незабываемый отдых на белоснежных пляжах с бирюзовой водой',
    dates: ['Январь', 'Февраль', 'Март']
  },
  {
    id: 2,
    title: 'Альпийские вершины',
    country: 'Швейцария',
    price: 120000,
    duration: '10 дней',
    type: 'Горы',
    image: 'https://cdn.poehali.dev/projects/4e746274-77a9-4bb4-aa47-be7d41230011/files/d1717d46-29c2-4714-a529-1c3e6a74f4a7.jpg',
    description: 'Покорите величественные Альпы и насладитесь горным воздухом',
    dates: ['Июнь', 'Июль', 'Август']
  },
  {
    id: 3,
    title: 'Европейские столицы',
    country: 'Италия',
    price: 90000,
    duration: '14 дней',
    type: 'Экскурсионный',
    image: 'https://cdn.poehali.dev/projects/4e746274-77a9-4bb4-aa47-be7d41230011/files/6a190608-cc2e-499c-957f-f711bdf5536a.jpg',
    description: 'Погрузитесь в историю и культуру старинных европейских городов',
    dates: ['Апрель', 'Май', 'Сентябрь']
  },
  {
    id: 4,
    title: 'Тропический Бали',
    country: 'Индонезия',
    price: 110000,
    duration: '12 дней',
    type: 'Пляжный отдых',
    image: 'https://cdn.poehali.dev/projects/4e746274-77a9-4bb4-aa47-be7d41230011/files/22f30c01-9751-4c98-ac79-a1ea08c95295.jpg',
    description: 'Экзотический остров с древними храмами и золотыми пляжами',
    dates: ['Май', 'Июнь', 'Июль']
  },
  {
    id: 5,
    title: 'Вершины Норвегии',
    country: 'Норвегия',
    price: 140000,
    duration: '9 дней',
    type: 'Горы',
    image: 'https://cdn.poehali.dev/projects/4e746274-77a9-4bb4-aa47-be7d41230011/files/d1717d46-29c2-4714-a529-1c3e6a74f4a7.jpg',
    description: 'Фьорды, горы и северное сияние в одном путешествии',
    dates: ['Январь', 'Февраль', 'Декабрь']
  },
  {
    id: 6,
    title: 'Прага и Будапешт',
    country: 'Чехия',
    price: 70000,
    duration: '8 дней',
    type: 'Экскурсионный',
    image: 'https://cdn.poehali.dev/projects/4e746274-77a9-4bb4-aa47-be7d41230011/files/6a190608-cc2e-499c-957f-f711bdf5536a.jpg',
    description: 'Два сердца Европы: архитектура, термальные бани и история',
    dates: ['Круглый год']
  }
];

const Index = () => {
  const [selectedCountry, setSelectedCountry] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<string>('all');
  const [selectedMonth, setSelectedMonth] = useState<string>('all');
  const [bookingTour, setBookingTour] = useState<Tour | null>(null);

  const countries = ['all', ...Array.from(new Set(tours.map(t => t.country)))];
  const types = ['all', ...Array.from(new Set(tours.map(t => t.type)))];

  const filteredTours = tours.filter(tour => {
    const countryMatch = selectedCountry === 'all' || tour.country === selectedCountry;
    const typeMatch = selectedType === 'all' || tour.type === selectedType;
    const priceMatch = 
      priceRange === 'all' ||
      (priceRange === 'low' && tour.price < 100000) ||
      (priceRange === 'medium' && tour.price >= 100000 && tour.price < 130000) ||
      (priceRange === 'high' && tour.price >= 130000);
    const monthMatch = selectedMonth === 'all' || tour.dates.includes(selectedMonth);
    
    return countryMatch && typeMatch && priceMatch && monthMatch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-primary to-secondary p-2 rounded-xl">
                <Icon name="Plane" className="text-white" size={28} />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                AGENT_TOUR
              </h1>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <a href="#tours" className="text-foreground hover:text-primary transition-colors font-semibold">
                Туры
              </a>
              <a href="#about" className="text-foreground hover:text-primary transition-colors font-semibold">
                О нас
              </a>
              <a href="#team" className="text-foreground hover:text-primary transition-colors font-semibold">
                Команда
              </a>
              <a href="#contacts" className="text-foreground hover:text-primary transition-colors font-semibold">
                Контакты
              </a>
              <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity">
                <Icon name="Phone" size={16} className="mr-2" />
                Связаться
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10" />
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h2 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
              Путешествуйте <span className="text-primary">с мечтой</span>
              <br />
              <span className="text-secondary">в сердце</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Откройте мир вместе с нами! Уникальные маршруты, лучшие цены и незабываемые впечатления ждут вас
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-lg px-8">
                <Icon name="Search" size={20} className="mr-2" />
                Найти тур
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 border-2">
                <Icon name="Info" size={20} className="mr-2" />
                Узнать больше
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="tours" className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold mb-4">Популярные направления</h3>
            <p className="text-muted-foreground text-lg">Выберите свое идеальное путешествие</p>
          </div>

          <Card className="mb-8 shadow-lg border-2 animate-scale-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Filter" size={24} className="text-primary" />
                Фильтры туров
              </CardTitle>
              <CardDescription>Найдите тур по вашим предпочтениям</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="country">Страна</Label>
                  <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                    <SelectTrigger id="country">
                      <SelectValue placeholder="Все страны" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Все страны</SelectItem>
                      {countries.filter(c => c !== 'all').map(country => (
                        <SelectItem key={country} value={country}>{country}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="type">Тип тура</Label>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Все типы" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Все типы</SelectItem>
                      {types.filter(t => t !== 'all').map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="price">Цена</Label>
                  <Select value={priceRange} onValueChange={setPriceRange}>
                    <SelectTrigger id="price">
                      <SelectValue placeholder="Любая цена" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Любая цена</SelectItem>
                      <SelectItem value="low">До 100 000 ₽</SelectItem>
                      <SelectItem value="medium">100 000 - 130 000 ₽</SelectItem>
                      <SelectItem value="high">От 130 000 ₽</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="month">Месяц</Label>
                  <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                    <SelectTrigger id="month">
                      <SelectValue placeholder="Любой месяц" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Любой месяц</SelectItem>
                      {['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'].map(month => (
                        <SelectItem key={month} value={month}>{month}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {(selectedCountry !== 'all' || selectedType !== 'all' || priceRange !== 'all' || selectedMonth !== 'all') && (
                <div className="mt-4">
                  <Button 
                    variant="ghost" 
                    onClick={() => {
                      setSelectedCountry('all');
                      setSelectedType('all');
                      setPriceRange('all');
                      setSelectedMonth('all');
                    }}
                    className="text-primary"
                  >
                    <Icon name="X" size={16} className="mr-2" />
                    Сбросить фильтры
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTours.map((tour, index) => (
              <Card 
                key={tour.id} 
                className="overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-fade-in border-2"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={tour.image} 
                    alt={tour.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <Badge className="absolute top-3 right-3 bg-accent text-white">
                    {tour.type}
                  </Badge>
                </div>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl mb-2">{tour.title}</CardTitle>
                      <CardDescription className="flex items-center gap-1">
                        <Icon name="MapPin" size={14} />
                        {tour.country}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{tour.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Icon name="Clock" size={12} />
                      {tour.duration}
                    </Badge>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Icon name="Calendar" size={12} />
                      {tour.dates[0]}
                    </Badge>
                  </div>
                  <Separator className="my-4" />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">от</p>
                      <p className="text-2xl font-bold text-primary">{tour.price.toLocaleString('ru-RU')} ₽</p>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                          onClick={() => setBookingTour(tour)}
                        >
                          Забронировать
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>Бронирование тура</DialogTitle>
                          <DialogDescription>
                            {tour.title} - {tour.country}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="name">Ваше имя</Label>
                            <Input id="name" placeholder="Иван Иванов" />
                          </div>
                          <div>
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="example@mail.ru" />
                          </div>
                          <div>
                            <Label htmlFor="phone">Телефон</Label>
                            <Input id="phone" type="tel" placeholder="+7 (900) 000-00-00" />
                          </div>
                          <div>
                            <Label htmlFor="message">Комментарий</Label>
                            <Textarea id="message" placeholder="Расскажите о ваших пожеланиях..." />
                          </div>
                          <Button className="w-full bg-gradient-to-r from-primary to-secondary">
                            Отправить заявку
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredTours.length === 0 && (
            <div className="text-center py-12">
              <Icon name="Search" size={48} className="mx-auto text-muted-foreground mb-4" />
              <p className="text-xl text-muted-foreground">Туры не найдены. Попробуйте изменить фильтры</p>
            </div>
          )}
        </div>
      </section>

      <section id="about" className="py-16 px-4 bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-4xl font-bold text-center mb-8">О нас</h3>
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <Card className="text-center border-2 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                    <Icon name="Award" size={32} className="text-primary" />
                  </div>
                  <CardTitle>15+ лет опыта</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Профессионально организуем туры с 2008 года</p>
                </CardContent>
              </Card>

              <Card className="text-center border-2 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto bg-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                    <Icon name="Users" size={32} className="text-secondary" />
                  </div>
                  <CardTitle>50 000+ клиентов</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Довольных путешественников по всему миру</p>
                </CardContent>
              </Card>

              <Card className="text-center border-2 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                    <Icon name="Globe" size={32} className="text-accent" />
                  </div>
                  <CardTitle>120+ стран</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Уникальные маршруты по всему земному шару</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section id="team" className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold mb-4">Наша команда</h3>
            <p className="text-muted-foreground text-lg">Профессионалы, которые сделают ваше путешествие незабываемым</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
            <Card className="text-center border-2 hover:shadow-xl transition-all hover:-translate-y-2">
              <CardHeader>
                <div className="mx-auto w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4">
                  <Icon name="User" size={40} className="text-white" />
                </div>
                <CardTitle className="text-lg">Анна Смирнова</CardTitle>
                <CardDescription>Директор агентства</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">12 лет в туризме</p>
              </CardContent>
            </Card>

            <Card className="text-center border-2 hover:shadow-xl transition-all hover:-translate-y-2">
              <CardHeader>
                <div className="mx-auto w-24 h-24 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center mb-4">
                  <Icon name="User" size={40} className="text-white" />
                </div>
                <CardTitle className="text-lg">Дмитрий Волков</CardTitle>
                <CardDescription>Менеджер по турам</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Эксперт по Европе</p>
              </CardContent>
            </Card>

            <Card className="text-center border-2 hover:shadow-xl transition-all hover:-translate-y-2">
              <CardHeader>
                <div className="mx-auto w-24 h-24 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center mb-4">
                  <Icon name="User" size={40} className="text-white" />
                </div>
                <CardTitle className="text-lg">Елена Петрова</CardTitle>
                <CardDescription>Специалист по визам</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Оформление за 3 дня</p>
              </CardContent>
            </Card>

            <Card className="text-center border-2 hover:shadow-xl transition-all hover:-translate-y-2">
              <CardHeader>
                <div className="mx-auto w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4">
                  <Icon name="User" size={40} className="text-white" />
                </div>
                <CardTitle className="text-lg">Игорь Козлов</CardTitle>
                <CardDescription>Гид-экскурсовод</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Знает 40+ стран</p>
              </CardContent>
            </Card>

            <Card className="text-center border-2 hover:shadow-xl transition-all hover:-translate-y-2">
              <CardHeader>
                <div className="mx-auto w-24 h-24 rounded-full bg-gradient-to-br from-secondary to-primary flex items-center justify-center mb-4">
                  <Icon name="User" size={40} className="text-white" />
                </div>
                <CardTitle className="text-lg">Мария Новикова</CardTitle>
                <CardDescription>Консультант</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Помощь 24/7</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="contacts" className="py-16 px-4 bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="container mx-auto max-w-4xl">
          <h3 className="text-4xl font-bold text-center mb-8">Контакты</h3>
          <Card className="border-2 shadow-lg">
            <CardHeader>
              <CardTitle>Свяжитесь с нами</CardTitle>
              <CardDescription>Мы ответим на все ваши вопросы</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <Icon name="Phone" size={20} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">Телефон</p>
                      <p className="text-muted-foreground">+7 (495) 123-45-67</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-secondary/10 p-3 rounded-lg">
                      <Icon name="Mail" size={20} className="text-secondary" />
                    </div>
                    <div>
                      <p className="font-semibold">Email</p>
                      <p className="text-muted-foreground">info@agent-tour.ru</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-accent/10 p-3 rounded-lg">
                      <Icon name="MapPin" size={20} className="text-accent" />
                    </div>
                    <div>
                      <p className="font-semibold">Адрес</p>
                      <p className="text-muted-foreground">Москва, ул. Тверская, 1</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="contact-name">Имя</Label>
                    <Input id="contact-name" placeholder="Ваше имя" />
                  </div>
                  <div>
                    <Label htmlFor="contact-email">Email</Label>
                    <Input id="contact-email" type="email" placeholder="example@mail.ru" />
                  </div>
                  <div>
                    <Label htmlFor="contact-message">Сообщение</Label>
                    <Textarea id="contact-message" placeholder="Ваш вопрос..." />
                  </div>
                  <Button className="w-full bg-gradient-to-r from-primary to-secondary">
                    <Icon name="Send" size={16} className="mr-2" />
                    Отправить
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <footer className="bg-gradient-to-r from-primary to-secondary text-white py-8 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Icon name="Plane" size={24} />
            <h4 className="text-2xl font-bold">AGENT_TOUR</h4>
          </div>
          <p className="text-white/80 mb-4">Путешествуйте с удовольствием</p>
          <p className="text-sm text-white/60">© 2024 AGENT_TOUR. Все права защищены</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;