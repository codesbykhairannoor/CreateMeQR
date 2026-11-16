// scripts/sync-tos-clause.cjs
// Adds Service Continuity, Lifetime Scope, and Founder Incapacitation/Cessation clause across all 30 languages

const fs = require('fs');
const path = require('path');

const TOS_TRANSLATIONS = {
  en: {
    lastUpdated: "Last Updated: November 2026",
    sec6Title: "Service Continuity, Lifetime Access & Unforeseen Discontinuation",
    sec6LifetimeTitle: "Meaning of 'Lifetime' Access",
    sec6LifetimeDesc: "'Lifetime Access' refers specifically to the commercial and operational lifespan of the CreateMy-QR service, not the natural biological lifespan of the buyer nor an unconditional guarantee of eternity until the end of time. While we endeavor to maintain the service online for as long as feasible, digital products are subject to evolving internet infrastructure, browser technologies, and operational sustainability.",
    sec6CessationTitle: "Founder Incapacitation, Cessation of Operations & Force Majeure",
    sec6CessationDesc: "CreateMy-QR is an independently developed and managed software tool. In the unforeseen event that operations become commercially unviable, technical infrastructure ceases to be available, or the founder/maintainer faces permanent incapacitation, severe illness, or death, the service may be suspended, archived, or permanently shut down. Users and purchasers expressly acknowledge that no personal, financial, or legal liability, nor any obligation for continued maintenance or pro-rata refunds, shall transfer to the founder, their family, or their estate in such circumstances.",
    sec6StaticGuaranteeTitle: "Permanent Independence of Generated Static QR Codes",
    sec6StaticGuaranteeDesc: "Because CreateMy-QR operates 100% on the client side using WebAssembly and strictly encodes direct data into ISO/IEC 18004 standard static barcodes without intermediary cloud redirect servers, every QR code, barcode, image (PNG/SVG), or printed sticker sheet you export remains completely functional forever. Even if this website, domain, or hosting is discontinued in the future, your printed codes will never expire or stop scanning."
  },
  id: {
    lastUpdated: "Terakhir Diperbarui: November 2026",
    sec6Title: "Kelangsungan Layanan, Batasan Akses 'Lifetime' & Penghentian Operasional",
    sec6LifetimeTitle: "Definisi Hak Akses 'Lifetime' (Seumur Hidup)",
    sec6LifetimeDesc: "Hak Akses 'Lifetime' merujuk secara khusus pada masa operasional dan keberadaan komersial dari layanan CreateMy-QR, bukan umur biologis dari pembeli dan bukan jaminan mutlak tanpa batas waktu hingga akhir zaman. Meskipun kami berkomitmen menjaga platform ini tetap berjalan selama mungkin, setiap produk digital terikat pada ketersediaan domain, pemeliharaan teknis, dan keberlanjutan operasional.",
    sec6CessationTitle: "Ketidakmampuan Pendiri, Kematian, Penutupan Layanan & Keadaan Kahar",
    sec6CessationDesc: "CreateMy-QR adalah proyek perangkat lunak yang dikembangkan dan dikelola secara mandiri. Dalam situasi tak terduga di mana layanan tidak lagi layak secara operasional, infrastruktur teknis terhenti, atau pendiri/pengelola mengalami ketidakmampuan fisik permanen, sakit parah, maupun meninggal dunia, layanan dapat dihentikan, diarsipkan, atau ditutup secara permanen. Pengguna dan pembeli menyetujui bahwa tidak ada tuntutan hukum, kewajiban pengembalian dana, atau kewajiban pemeliharaan berkelanjutan yang dapat ditimpakan kepada pendiri, keluarga, maupun ahli warisnya.",
    sec6StaticGuaranteeTitle: "Jaminan Independensi & Keabadian Kode Statis yang Telah Dibuat",
    sec6StaticGuaranteeDesc: "Karena CreateMy-QR beroperasi 100% di sisi klien menggunakan WebAssembly dan secara langsung mengenkode data ke dalam standar ISO/IEC 18004 tanpa melalui server redirect perantara, setiap kode QR, barcode, file gambar (PNG/SVG), maupun lembar stiker cetak yang pernah Anda unduh akan tetap berfungsi selamanya di dunia nyata. Meskipun website atau domain ini di masa depan tidak lagi aktif, cetakan fisik dan kode Anda tidak akan pernah mati atau berhenti terpindai."
  },
  es: {
    lastUpdated: "Última actualización: Noviembre 2026",
    sec6Title: "Continuidad del Servicio, Acceso 'Lifetime' y Cese Operativo Imprevisto",
    sec6LifetimeTitle: "Definición del Acceso 'Lifetime' (Vitalicio)",
    sec6LifetimeDesc: "El 'Acceso Vitalicio' se refiere estrictamente a la vida comercial y operativa del servicio CreateMy-QR, no a la vida biológica del comprador ni a una garantía incondicional de eternidad. Aunque nos esforzamos por mantener el servicio activo el mayor tiempo posible, los productos digitales dependen de la infraestructura de internet, los navegadores y la sostenibilidad operativa.",
    sec6CessationTitle: "Incapacidad del Fundador, Cese de Operaciones y Fuerza Mayor",
    sec6CessationDesc: "CreateMy-QR es un proyecto de software desarrollado de forma independiente. En caso de que el servicio deje de ser viable, cese la infraestructura o el fundador sufra incapacidad permanente, enfermedad grave o fallecimiento, la plataforma podrá suspenderse o cerrarse definitivamente. Los usuarios aceptan que no existirá responsabilidad legal, financiera ni obligación de reembolso o mantenimiento exigible al fundador, su familia o sus herederos.",
    sec6StaticGuaranteeTitle: "Independencia Permanente de los Códigos QR Estáticos Generados",
    sec6StaticGuaranteeDesc: "Dado que CreateMy-QR opera 100% en el navegador del cliente mediante WebAssembly y codifica datos directos según el estándar ISO/IEC 18004 sin servidores intermediarios de redirección, cada código QR, código de barras, imagen (PNG/SVG) o lámina de stickers que exportes funcionará para siempre. Aunque este sitio web o dominio dejara de existir en el futuro, tus códigos impresos nunca vencerán ni dejarán de escanearse."
  },
  fr: {
    lastUpdated: "Dernière mise à jour : Novembre 2026",
    sec6Title: "Continuité du Service, Accès 'À Vie' et Cessation Imprévue d'Activité",
    sec6LifetimeTitle: "Définition de l'Accès 'À Vie' (Lifetime)",
    sec6LifetimeDesc: "L'« Accès à vie » fait référence spécifiquement à la durée de vie commerciale et opérationnelle du service CreateMy-QR, et non à l'espérance de vie biologique de l'acheteur ni à une garantie d'éternité. Bien que nous nous efforcions de maintenir la plateforme en ligne aussi longtemps que possible, les services numériques sont tributaires de l'infrastructure internet et de la pérennité opérationnelle.",
    sec6CessationTitle: "Incapacité du Fondateur, Cessation d'Activité et Force Majeure",
    sec6CessationDesc: "CreateMy-QR est un outil logiciel développé et géré de manière indépendante. Dans l'éventualité imprévue où les opérations deviendraient irréalisables, ou en cas d'incapacité permanente, de maladie grave ou de décès du fondateur/mainteneur, le service pourra être suspendu, archivé ou fermé définitivement. Les utilisateurs reconnaissent qu'aucune responsabilité financière ou obligation de remboursement ne pourra être imputée au fondateur ou à ses héritiers.",
    sec6StaticGuaranteeTitle: "Indépendance Permanente des QR Codes Statiques Générés",
    sec6StaticGuaranteeDesc: "Dans la mesure où CreateMy-QR fonctionne à 100% côté client via WebAssembly et encode directement les données selon la norme ISO/IEC 18004 sans passer par des serveurs de redirection cloud, chaque QR code, code-barres, image (PNG/SVG) ou planche d'autocollants imprimée que vous exportez restera fonctionnel pour toujours. Même si ce site web venait à disparaître un jour, vos codes imprimés ne cesseront jamais de fonctionner."
  },
  de: {
    lastUpdated: "Zuletzt aktualisiert: November 2026",
    sec6Title: "Dienstkontinuität, 'Lifetime'-Zugang und Unvorhergesehene Betriebseinstellung",
    sec6LifetimeTitle: "Definition des 'Lifetime'-Zugangs",
    sec6LifetimeDesc: "'Lifetime-Zugang' bezieht sich ausdrücklich auf die wirtschaftliche und betriebliche Lebensdauer des Dienstes CreateMy-QR, nicht auf die biologische Lebensdauer des Käufers oder eine Ewigkeitsgarantie. Obwohl wir bestrebt sind, die Plattform so lange wie möglich bereitzustellen, unterliegen digitale Produkte den Rahmenbedingungen von Hosting, Browser-Standards und technischer Machbarkeit.",
    sec6CessationTitle: "Handlungsunfähigkeit des Gründers, Betriebseinstellung und Höhere Gewalt",
    sec6CessationDesc: "CreateMy-QR ist ein unabhängig entwickeltes Softwareprojekt. Sollte der Betrieb unrentabel werden, die technische Infrastruktur enden oder der Gründer dauerhaft handlungsunfähig werden bzw. versterben, kann der Dienst ausgesetzt oder dauerhaft eingestellt werden. Nutzer und Käufer erkennen ausdrücklich an, dass in solchen Fällen keinerlei persönliche Haftung oder Erstattungsansprüche gegenüber dem Gründer oder seinen Erben bestehen.",
    sec6StaticGuaranteeTitle: "Dauerhafte Unabhängigkeit Generierter Statischer QR-Codes",
    sec6StaticGuaranteeDesc: "Da CreateMy-QR zu 100% client-seitig über WebAssembly arbeitet und Nutzdaten direkt nach ISO/IEC 18004 ohne zwischengeschaltete Weiterleitungsserver kodiert, bleibt jeder exportierte QR-Code, Barcode, jede Grafik (PNG/SVG) und jeder gedruckte Bogen dauerhaft funktionsfähig. Selbst wenn diese Website in Zukunft eingestellt werden sollte, verlieren Ihre gedruckten Codes niemals ihre Gültigkeit."
  },
  pt: {
    lastUpdated: "Última atualização: Novembro de 2026",
    sec6Title: "Continuidade do Serviço, Acesso 'Vitalício' e Encerramento Operacional Imprevisto",
    sec6LifetimeTitle: "Definição do Acesso 'Lifetime' (Vitalício)",
    sec6LifetimeDesc: "O 'Acesso Vitalício' refere-se estritamente ao ciclo de vida comercial e operacional do serviço CreateMy-QR, não à vida biológica do comprador nem a uma garantia perpétua até o fim dos tempos. Embora busquemos manter o serviço ativo pelo maior tempo possível, ferramentas digitais dependem da infraestrutura de hospedagem e da viabilidade técnica contínua.",
    sec6CessationTitle: "Incapacidade do Fundador, Encerramento de Operações e Força Maior",
    sec6CessationDesc: "CreateMy-QR é um projeto de software gerido de forma independente. Caso a operação se torne inviável, a infraestrutura seja descontinuada ou o fundador sofra incapacidade permanente ou falecimento, o serviço poderá ser suspenso ou encerrado permanentemente. Usuários e compradores concordam que nenhuma responsabilidade financeira ou obrigação de reembolso recairá sobre o fundador ou seus herdeiros.",
    sec6StaticGuaranteeTitle: "Independência Permanente dos Códigos QR Estáticos Gerados",
    sec6StaticGuaranteeDesc: "Como o CreateMy-QR funciona 100% no navegador via WebAssembly e codifica dados diretos no padrão ISO/IEC 18004 sem servidores intermediários de redirecionamento, todo código QR, código de barras, imagem (PNG/SVG) ou folha de etiquetas que você exportar funcionará para sempre. Mesmo que este site deixe de existir no futuro, seus códigos impressos nunca expirarão."
  },
  it: {
    lastUpdated: "Ultimo aggiornamento: Novembre 2026",
    sec6Title: "Continuità del Servizio, Accesso 'Lifetime' e Cessazione Imprevista dell'Attività",
    sec6LifetimeTitle: "Definizione dell'Accesso 'Lifetime' (A Vita)",
    sec6LifetimeDesc: "L'«Accesso a vita» si riferisce specificamente alla durata commerciale e operativa del servizio CreateMy-QR, non alla vita biologica dell'acquirente né a una garanzia incondizionata di eternità. Sebbene il nostro impegno sia mantenere il servizio attivo il più a lungo possibile, i prodotti digitali sono soggetti all'evoluzione delle infrastrutture internet e alla sostenibilità operativa.",
    sec6CessationTitle: "Incapacità del Fondatore, Cessazione delle Attività e Forza Maggiore",
    sec6CessationDesc: "CreateMy-QR è un software sviluppato e gestito in modo indipendente. Nell'imprevista eventualità in cui la gestione diventi impraticabile, o in caso di incapacità permanente, grave malattia o decesso del fondatore, il servizio potrà essere sospeso o chiuso definitivamente. Gli utenti accettano che nessuna responsabilità finanziaria o richiesta di rimborso potrà essere avanzata nei confronti del fondatore o dei suoi eredi.",
    sec6StaticGuaranteeTitle: "Indipendenza Permanente dei Codici QR Statici Generati",
    sec6StaticGuaranteeDesc: "Poiché CreateMy-QR opera al 100% sul dispositivo client tramite WebAssembly e codifica direttamente i dati secondo lo standard ISO/IEC 18004 senza server di reindirizzamento intermedi, qualsiasi codice QR, codice a barre, immagine (PNG/SVG) o foglio adesivo esportato continuerà a funzionare per sempre. Anche se questo sito web dovesse un giorno chiudere, i tuoi codici stampati non smetteranno mai di funzionare."
  },
  ja: {
    lastUpdated: "最終更新日：2026年11月",
    sec6Title: "サービスの継続性、「ライフタイム」アクセスの定義、および不測の運営終了について",
    sec6LifetimeTitle: "「ライフタイム（永久）」アクセスの法的定義",
    sec6LifetimeDesc: "「ライフタイム（永久）」アクセスとは、CreateMy-QRサービス自体の事業運営期間を指すものであり、購入者の生物学的寿命や永久不滅のサービス提供を保証するものではありません。可能な限り長期的な運営に努めますが、デジタルサービスはドメイン維持、ブラウザ技術の進化、および運営の継続性に依存します。",
    sec6CessationTitle: "創設者の健康状態・逝去、不可抗力、および事業終了時の免責事項",
    sec6CessationDesc: "CreateMy-QRは個人によって独立して開発・運営されているツールです。事業継続が困難となった場合、技術的基盤が終了した場合、または創設者の深刻な健康悪化、恒久的な行動不能、もしくは逝去が発生した場合、サービスは予告なく停止または閉鎖されることがあります。ユーザーは、創設者、その家族、または相続人に対して金銭的補償や返金、維持義務を請求できないことに明示的に同意するものとします。",
    sec6StaticGuaranteeTitle: "作成済み静的QRコードの永久的な独立性と機能保証",
    sec6StaticGuaranteeDesc: "CreateMy-QRはWebAssemblyを活用して100%クライアント側で動作し、中間リダイレクトサーバーを介さずISO/IEC 18004規格に準拠したデータを直接埋め込むため、作成・ダウンロードしたすべてのQRコード、バーコード、画像ファイル（PNG/SVG）、および印刷物は永久に機能し続けます。将来的に本ウェブサイトが終了した場合でも、印刷されたQRコードが無効化されることは一切ありません。"
  },
  ko: {
    lastUpdated: "최종 수정일: 2026년 11월",
    sec6Title: "서비스 연속성, '평생(Lifetime)' 이용 범위 및 예기치 못한 운영 중단 안내",
    sec6LifetimeTitle: "'평생(Lifetime)' 이용 권한의 법적 정의",
    sec6LifetimeDesc: "'평생(Lifetime)' 이용 권한은 CreateMy-QR 서비스의 상업적·기술적 운영 수명을 의미하며, 구매자의 생물학적 수명이나 영구적인 서비스 존속을 절대적으로 보장하는 것은 아닙니다. 가능한 오랫동안 서비스를 유지하기 위해 최선을 다하지만, 디지털 서비스는 인터넷 인프라 및 운영 지속성에 따라 달라질 수 있습니다.",
    sec6CessationTitle: "설립자의 유고·사망, 운영 중단 및 불가항력에 대한 면책",
    sec6CessationDesc: "CreateMy-QR은 독립적으로 개발 및 운영되는 소프트웨어입니다. 서비스 유지가 불가능해지거나 기술 인프라가 종료되는 경우, 또는 설립자의 심각한 질병, 영구적인 유고 또는 사망이 발생하는 경우 서비스는 중단되거나 영구히 폐쇄될 수 있습니다. 이용자는 어떠한 상황에서도 설립자, 그 가족 또는 상속인에게 금전적 배상이나 환불 책임을 물을 수 없음에 동의합니다.",
    sec6StaticGuaranteeTitle: "생성된 정적 QR 코드의 영구적 독립성 보장",
    sec6StaticGuaranteeDesc: "CreateMy-QR은 WebAssembly를 사용하여 100% 클라이언트 측에서 작동하며, 중계 리디렉션 서버 없이 ISO/IEC 18004 국제 표준에 따라 데이터를 직접 인코딩합니다. 따라서 생성 및 다운로드한 모든 QR 코드, 바코드, 이미지(PNG/SVG) 및 인쇄물은 영구적으로 작동합니다. 향후 본 웹사이트의 운영이 종료되더라도 인쇄된 코드는 절대 만료되거나 스캔이 중단되지 않습니다."
  },
  zh: {
    lastUpdated: "最后更新：2026年11月",
    sec6Title: "服务持续性、“终身（Lifetime）”权益范围与不可抗力终止条款",
    sec6LifetimeTitle: "“终身（Lifetime）”访问权限定义",
    sec6LifetimeDesc: "“终身（Lifetime）”访问权限特指CreateMy-QR产品本身的商业运营生命周期，而非购买者个人的生理寿命，亦非无限期永恒存在的绝对保证。尽管我们致力于尽可能长期维护本服务的在线运行，但数字化服务均受限于网络基础设施、浏览器技术演进及运营可行性。",
    sec6CessationTitle: "创始人变故、服务关停与不可抗力免责声明",
    sec6CessationDesc: "CreateMy-QR由独立开发者维护。若因技术不可行、基础设施终止，或创始人遭遇重大疾病、永久丧失行为能力或离世等不可抗力导致无法继续维护，本平台可能会暂停或永久关闭。用户与购买者明确同意，在上述情况下，绝不追究创始人、其家属或法定继承人的任何个人、经济或退款法律责任。",
    sec6StaticGuaranteeTitle: "已生成静态二维码的永久独立性保证",
    sec6StaticGuaranteeDesc: "鉴于CreateMy-QR基于WebAssembly技术完全在用户本地客户端运行，且严格按照ISO/IEC 18004国际标准将数据直接编码至静态模块中，无需任何第三方云端重定向服务器，因此您生成并导出的所有二维码、条形码、图片文件（PNG/SVG）及印刷物料均将永久有效。即便未来本网站因任何原因停止运营，您已印刷的所有二维码也绝不会失效。"
  },
  ru: {
    lastUpdated: "Последнее обновление: Ноябрь 2026",
    sec6Title: "Непрерывность сервиса, пожизненный доступ ('Lifetime') и непредвиденное прекращение работы",
    sec6LifetimeTitle: "Определение пожизненного доступа ('Lifetime')",
    sec6LifetimeDesc: "«Пожизненный доступ» (Lifetime) относится исключительно к периоду коммерческой и технической эксплуатации сервиса CreateMy-QR, а не к биологической жизни покупателя или бесконечной гарантии доступности. Мы стремимся поддерживать сервис как можно дольше, однако любые цифровые продукты зависят от инфраструктуры интернета и операционной целесообразности.",
    sec6CessationTitle: "Форс-мажор, недееспособность создателя и прекращение деятельности",
    sec6CessationDesc: "CreateMy-QR — независимый программный проект. В случае невозможности дальнейшего поддержания проекта, прекращения инфраструктуры, тяжелой болезни, недееспособности или смерти создателя сервис может быть приостановлен или полностью закрыт. Пользователи соглашаются, что в таких обстоятельствах создатель, его семья или наследники не несут никаких финансовых обязательств или требований о возврате средств.",
    sec6StaticGuaranteeTitle: "Полная автономность созданных статических QR-кодов",
    sec6StaticGuaranteeDesc: "Поскольку CreateMy-QR работает на 100% на стороне клиента с помощью WebAssembly и кодирует данные напрямую по стандарту ISO/IEC 18004 без промежуточных серверов перенаправления, каждый созданный QR-код, штрих-код, файл (PNG/SVG) или распечатанный лист наклеек будет работать вечно. Даже если этот сайт перестанет существовать, ваши напечатанные коды никогда не перестанут сканироваться."
  },
  nl: {
    lastUpdated: "Laatst bijgewerkt: November 2026",
    sec6Title: "Dienstcontinuïteit, 'Lifetime' Toegang en Onvoorziene Beëindiging van Activiteiten",
    sec6LifetimeTitle: "Definitie van 'Lifetime' Toegang",
    sec6LifetimeDesc: "'Lifetime Toegang' verwijst specifiek naar de operationele en commerciële levensduur van de CreateMy-QR-dienst, niet naar de biologische levensduur van de koper noch naar een garantie van eeuwigheid. Hoewel we ernaar streven het platform zo lang mogelijk online te houden, zijn digitale tools afhankelijk van internetinfrastructuur en operationele haalbaarheid.",
    sec6CessationTitle: "Onbekwaamheid van de Oprichter, Beëindiging van Activiteiten en Overmacht",
    sec6CessationDesc: "CreateMy-QR is een onafhankelijk ontwikkeld softwareproject. In het onvoorziene geval dat de exploitatie niet langer haalbaar is, of bij blijvende arbeidsongeschiktheid of overlijden van de oprichter, kan de dienst worden opgeschort of permanent beëindigd. Gebruikers stemmen ermee in dat er in dergelijke gevallen geen enkele aansprakelijkheid of verplichting tot terugbetaling overgaat op de oprichter of diens erfgenamen.",
    sec6StaticGuaranteeTitle: "Permanente Onafhankelijkheid van Gegenereerde Statische QR-codes",
    sec6StaticGuaranteeDesc: "Omdat CreateMy-QR 100% client-side werkt via WebAssembly en gegevens rechtstreeks codeert volgens de ISO/IEC 18004-norm zonder omleidingsservers, blijft elke geëxporteerde QR-code, barcode, afbeelding (PNG/SVG) of printvel voor altijd werken. Zelfs als deze website ooit zou stoppen, blijven uw afgedrukte codes gewoon scanbaar."
  },
  pl: {
    lastUpdated: "Ostatnia aktualizacja: Listopad 2026",
    sec6Title: "Ciągłość Usługi, Dostęp 'Lifetime' i Nieprzewidziane Zakończenie Działalności",
    sec6LifetimeTitle: "Definicja Dostępu 'Lifetime'",
    sec6LifetimeDesc: "Dostęp 'Lifetime' odnosi się ściśle do operacyjnego i komercyjnego czasu istnienia serwisu CreateMy-QR, a nie do biologicznej długości życia kupującego ani bezwarunkowej gwarancji wieczności. Dokładamy starań, aby utrzymać platformę jak najdłużej, jednak produkty cyfrowe podlegają ewolucji technologii sieciowych i możliwościom bieżącego utrzymania.",
    sec6CessationTitle: "Niezdolność Założyciela do Działania, Zakończenie Działalności i Siła Wyższa",
    sec6CessationDesc: "CreateMy-QR to niezależny projekt oprogramowania. W nieprzewidzianym przypadku, gdy dalsze utrzymanie stanie się niemożliwe, lub w razie trwałej niezdolności do pracy bądź śmierci założyciela, usługa może zostać zawieszona lub trwale zamknięta. Użytkownicy przyjmują do wiadomości, że w takich okolicznościach nie przysługują żadne roszczenia finansowe ani prawne wobec założyciela lub jego spadkobierców.",
    sec6StaticGuaranteeTitle: "Trwała Niezależność Wygenerowanych Statycznych Kodów QR",
    sec6StaticGuaranteeDesc: "Ponieważ CreateMy-QR działa w 100% po stronie klienta przy użyciu WebAssembly i koduje dane bezpośrednio według standardu ISO/IEC 18004 bez serwerów przekierowujących, każdy wyeksportowany kod QR, kod kreskowy, plik graficzny (PNG/SVG) czy arkusz naklejek będzie działać na zawsze. Nawet jeśli ta strona w przyszłości przestanie istnieć, Twoje wydrukowane kody nigdy nie przestaną się skanować."
  },
  tr: {
    lastUpdated: "Son Güncelleme: Kasım 2026",
    sec6Title: "Hizmet Sürekliliği, 'Ömür Boyu' Erişim Kapsamı ve Öngörülemeyen Faaliyet Durdurma",
    sec6LifetimeTitle: "'Ömür Boyu' (Lifetime) Erişim Tanımı",
    sec6LifetimeDesc: "'Ömür Boyu Erişim', satın alan kişinin biyolojik ömrünü veya sonsuza kadar kesintisiz hizmet garantisini değil, CreateMy-QR hizmetinin ticari ve operasyonel varlık süresini ifade eder. Platformu mümkün olan en uzun süre yayında tutmayı hedeflesek de, dijital hizmetler sunucu altyapısına ve operasyonel sürdürülebilirliğe tabidir.",
    sec6CessationTitle: "Kurucunun Durumu, Vefat, Faaliyetin Durdurulması ve Mücbir Sebepler",
    sec6CessationDesc: "CreateMy-QR bağımsız olarak geliştirilen bir projedir. Hizmetin sürdürülemez hale gelmesi, teknik altyapının sona ermesi veya kurucunun kalıcı iş göremezliği, ağır hastalığı ya da vefatı durumunda platform kapatılabilir. Kullanıcılar, kurucuya veya mirasçılarına hiçbir mali sorumluluk veya geri ödeme talebi yüklenemeyeceğini kabul eder.",
    sec6StaticGuaranteeTitle: "Oluşturulan Statik QR Kodların Kalıcı Bağımsızlığı",
    sec6StaticGuaranteeDesc: "CreateMy-QR, WebAssembly kullanarak %100 istemci tarafında çalıştığı ve verileri yönlendirme sunucuları olmadan doğrudan ISO/IEC 18004 standardında kodladığı için, dışa aktardığınız tüm QR kodlar, barkodlar, görseller (PNG/SVG) veya etiket baskıları sonsuza kadar çalışmaya devam eder. İleride bu web sitesi kapansa dahi basılı kodlarınız asla geçersiz kalmaz."
  },
  vi: {
    lastUpdated: "Cập nhật lần cuối: Tháng 11 năm 2026",
    sec6Title: "Tính Liên Tục Của Dịch Vụ, Phạm Vi 'Trọn Đời' và Ngừng Hoạt Động Bất Khả Kháng",
    sec6LifetimeTitle: "Định Nghĩa Quyền Truy Cập 'Trọn Đời'",
    sec6LifetimeDesc: "'Truy Cập Trọn Đời' đề cập cụ thể đến vòng đời vận hành và thương mại của dịch vụ CreateMy-QR, không phải là tuổi thọ sinh học của người mua cũng như không phải là sự đảm bảo vĩnh cửu không điều kiện. Mặc dù chúng tôi nỗ lực duy trì dịch vụ lâu nhất có thể, các công cụ kỹ thuật số vẫn phụ thuộc vào hạ tầng mạng và tính bền vững khi vận hành.",
    sec6CessationTitle: "Trường Hợp Người Sáng Lập Mất Năng Lực, Qua Đời và Bất Khả Kháng",
    sec6CessationDesc: "CreateMy-QR là dự án phần mềm do cá nhân phát triển độc lập. Trong trường hợp dịch vụ không còn khả thi, hoặc người sáng lập mất năng lực hành vi vĩnh viễn, bệnh nặng hay qua đời, dịch vụ có thể bị tạm ngưng hoặc đóng vĩnh viễn. Người dùng đồng ý rằng không có trách nhiệm bồi thường tài chính nào được áp đặt lên người sáng lập hoặc người thừa kế.",
    sec6StaticGuaranteeTitle: "Tính Độc Lập Vĩnh Viễn Của Mã QR Tĩnh Đã Tạo",
    sec6StaticGuaranteeDesc: "Vì CreateMy-QR hoạt động 100% phía trình duyệt bằng WebAssembly và mã hóa dữ liệu trực tiếp theo tiêu chuẩn ISO/IEC 18004 mà không qua máy chủ chuyển hướng trung gian, mọi mã QR, mã vạch, tệp hình ảnh (PNG/SVG) hoặc nhãn dán in bạn đã xuất sẽ hoạt động mãi mãi. Ngay cả khi trang web này ngừng hoạt động trong tương lai, mã in của bạn sẽ không bao giờ hết hạn."
  },
  th: {
    lastUpdated: "ปรับปรุงล่าสุด: พฤศจิกายน 2026",
    sec6Title: "ความต่อเนื่องของการให้บริการ ขอบเขตสิทธิ์ 'ตลอดชีพ' และการยุติการดำเนินงานที่ไม่คาดคิด",
    sec6LifetimeTitle: "นิยามของสิทธิ์การเข้าถึง 'ตลอดชีพ'",
    sec6LifetimeDesc: "'การเข้าถึงตลอดชีพ' หมายถึงอายุการดำเนินงานเชิงพาณิชย์ของบริการ CreateMy-QR โดยเฉพาะ มิได้หมายถึงอายุขัยของผู้ซื้อหรือการรับประกันความคงอยู่ตลอดกาลอย่างไม่มีเงื่อนไข แม้เราจะมุ่งมั่นดูแลระบบให้นานที่สุด แต่ผลิตภัณฑ์ดิจิทัลจำเป็นต้องขึ้นอยู่กับโครงสร้างพื้นฐานอินเทอร์เน็ตและความเป็นไปได้ในการบำรุงรักษา",
    sec6CessationTitle: "การสูญเสียความสามารถหรือการเสียชีวิตของผู้ก่อตั้ง เหตุสุดวิสัย และการยุติกิจการ",
    sec6CessationDesc: "CreateMy-QR เป็นซอฟต์แวร์ที่พัฒนาและดูแลอย่างอิสระ ในกรณีที่ไม่สามารถดำเนินการต่อได้ หรือผู้ก่อตั้งเจ็บป่วยรุนแรง ทุพพลภาพ หรือเสียชีวิต บริการอาจถูกปิดตัวลงอย่างถาวร ผู้ใช้ตกลงว่าผู้ก่อตั้ง ครอบครัว หรือทายาทไม่ต้องรับผิดชอบทางการเงินหรือการชดเชยใดๆ ในสถานการณ์ดังกล่าว",
    sec6StaticGuaranteeTitle: "ความเป็นอิสระถาวรของคิวอาร์โค้ดแบบคงที่ที่สร้างขึ้น",
    sec6StaticGuaranteeDesc: "เนื่องจาก CreateMy-QR ทำงานบนฝั่งไคลเอนต์ 100% ผ่าน WebAssembly และเข้ารหัสข้อมูลโดยตรงตามมาตรฐาน ISO/IEC 18004 โดยไม่ผ่านเซิร์ฟเวอร์เปลี่ยนเส้นทาง ดังนั้นคิวอาร์โค้ด บาร์โค้ด ไฟล์รูปภาพ (PNG/SVG) หรือแผ่นสติกเกอร์ที่พิมพ์ออกมาจะยังคงใช้งานได้ตลอดไป แม้ในอนาคตเว็บไซต์นี้จะปิดตัวลง รหัสที่คุณพิมพ์ไว้ก็จะไม่หมดอายุ"
  },
  hi: {
    lastUpdated: "अंतिम अद्यतन: नवंबर 2026",
    sec6Title: "सेवा निरंतरता, 'लाइफटाइम' पहुंच की परिभाषा और अप्रत्याशित परिचालन समाप्ति",
    sec6LifetimeTitle: "'लाइफटाइम' एक्सेस की परिभाषा",
    sec6LifetimeDesc: "'लाइफटाइम एक्सेस' विशेष रूप से CreateMy-QR सेवा के व्यावसायिक और परिचालन जीवनकाल को संदर्भित करता है, न कि खरीदार के जैविक जीवनकाल को या अनंत काल तक सेवा की पूर्ण गारंटी को। यद्यपि हम यथासंभव लंबे समय तक सेवा जारी रखने का प्रयास करते हैं, डिजिटल उत्पाद तकनीकी व्यवहार्यता और इंटरनेट ढांचे पर निर्भर होते हैं।",
    sec6CessationTitle: "संस्थापक की अक्षमता, मृत्यु, संचालन समाप्ति और अप्रत्याशित घटनाएं",
    sec6CessationDesc: "CreateMy-QR स्वतंत्र रूप से विकसित और प्रबंधित सॉफ्टवेयर है। यदि संचालन असंभव हो जाता है, या संस्थापक की स्थायी अक्षमता, गंभीर बीमारी या मृत्यु हो जाती है, तो सेवा को बंद किया जा सकता है। उपयोगकर्ता स्पष्ट रूप से स्वीकार करते हैं कि ऐसी परिस्थितियों में संस्थापक, उनके परिवार या उत्तराधिकारियों पर कोई वित्तीय या कानूनी दायित्व लागू नहीं होगा।",
    sec6StaticGuaranteeTitle: "उत्पन्न स्थिर क्यूआर कोड की स्थायी स्वतंत्रता",
    sec6StaticGuaranteeDesc: "चूंकि CreateMy-QR वेबअसेंबली के माध्यम से 100% क्लाइंट-साइड संचालित होता है और बिना किसी रीडायरेक्ट सर्वर के सीधे ISO/IEC 18004 मानक में डेटा एनकोड करता है, आपके द्वारा बनाया और डाउनलोड किया गया प्रत्येक क्यूआर कोड, बारकोड, इमेज (PNG/SVG) हमेशा काम करता रहेगा। यदि भविष्य में यह वेबसाइट बंद भी हो जाती है, तो भी आपके मुद्रित कोड कभी समाप्त नहीं होंगे।"
  },
  ar: {
    lastUpdated: "آخر تحديث: نوفمبر 2026",
    sec6Title: "استمرارية الخدمة، ونطاق الوصول 'مدى الحياة'، والتوقف التشغيلي غير المتوقع",
    sec6LifetimeTitle: "تعريف الوصول 'مدى الحياة'",
    sec6LifetimeDesc: "يشير 'الوصول مدى الحياة' حصرياً إلى العمر التشغيلي والتجاري لخدمة CreateMy-QR، وليس إلى العمر البيولوجي للمشتري أو ضماناً أبدياً للخلود. على الرغم من أننا نسعى جاهدين للحفاظ على المنصة قيد التشغيل لأطول فترة ممكنة، إلا أن الخدمات الرقمية تخضع للبنية التحتية للإنترنت واستدامة التشغيل.",
    sec6CessationTitle: "عجز المؤسس، الوفاة، إنهاء العمليات والقوة القاهرة",
    sec6CessationDesc: "CreateMy-QR هو مشروع برمجي مُدار بشكل مستقل. في حال أصبح الاستمرار غير ممكن تقنياً أو تشغيلياً، أو في حالة العجز الدائم أو الوفاة للمؤسس، يجوز تعليق الخدمة أو إغلاقها نهائياً. يوافق المستخدمون صراحة على عدم مطالبة المؤسس أو أسرته أو ورثته بأي مسؤولية مالية أو قانونية أو تعويضات في مثل هذه الظروف.",
    sec6StaticGuaranteeTitle: "استقلالية دائمة لرموز QR الثابتة المنشأة",
    sec6StaticGuaranteeDesc: "نظراً لأن CreateMy-QR يعمل بنسبة 100% داخل المتصفح عبر WebAssembly ويقوم بتشفير البيانات مباشرة وفقاً لمعيار ISO/IEC 18004 دون خوادم إعادة توجيه وسيطة، فإن أي رمز QR أو باركود أو صورة (PNG/SVG) أو ملصقات مطبوعة تم تنزيلها ستستمر في العمل للأبد. حتى لو تم إيقاف الموقع مستقبلاً، فإن رموزك المطبوعة لن تنتهي صلاحيتها أبداً."
  },
  ms: {
    lastUpdated: "Terakhir Dikemas Kini: November 2026",
    sec6Title: "Kesinambungan Perkhidmatan, Skop Akses 'Seumur Hidup' & Penamatan Operasi Luar Jangka",
    sec6LifetimeTitle: "Definisi Hak Akses 'Seumur Hidup' (Lifetime)",
    sec6LifetimeDesc: "Hak Akses 'Seumur Hidup' merujuk khusus kepada jangka hayat operasi dan komersial perkhidmatan CreateMy-QR, bukan jangka hayat biologi pembeli mahupun jaminan mutlak tanpa had masa. Walaupun kami komited memastikan platform ini terus berfungsi selama mungkin, perkhidmatan digital bergantung kepada domain dan kesinambungan operasi.",
    sec6CessationTitle: "Ketidakupayaan Pengasas, Kematian, Penutupan Operasi & Keadaan Kahar",
    sec6CessationDesc: "CreateMy-QR ialah projek perisian yang diuruskan secara bebas. Sekiranya operasi tidak lagi berdaya maju, atau pengasas mengalami ketidakupayaan kekal, sakit tenat atau meninggal dunia, perkhidmatan boleh ditutup selama-lamanya. Pengguna bersetuju bahawa tiada liabiliti kewangan atau tuntutan ganti rugi boleh dikenakan kepada pengasas atau warisnya.",
    sec6StaticGuaranteeTitle: "Jaminan Keabadian & Kebebasan Kod QR Statik yang Dihasilkan",
    sec6StaticGuaranteeDesc: "Oleh kerana CreateMy-QR beroperasi 100% di sisi klien melalui WebAssembly dan mengekod data terus mengikut piawaian ISO/IEC 18004 tanpa pelayan lencongan perantara, semua kod QR, kod bar, fail imej (PNG/SVG) atau helaian pelekat yang dimuat turun akan kekal berfungsi selama-lamanya. Walaupun laman web ini ditutup pada masa hadapan, cetakan fizikal kod anda tidak akan pernah luput."
  },
  tl: {
    lastUpdated: "Huling Na-update: Nobyembre 2026",
    sec6Title: "Pagpapatuloy ng Serbisyo, Kahulugan ng 'Lifetime' Access at Hindi Inaasahang Pagtigil ng Operasyon",
    sec6LifetimeTitle: "Kahulugan ng 'Lifetime' Access",
    sec6LifetimeDesc: "Ang 'Lifetime Access' ay partikular na tumutukoy sa komersyal at operasyonal na itatagal ng serbisyong CreateMy-QR, hindi sa biyolohikal na buhay ng bumili o garantiya ng pananatili magpakailanman. Bagama't layunin naming panatilihing online ang platform hangga't maaari, ang mga digital na produkto ay nakasalalay sa internet infrastructure at kakayahang magpatuloy.",
    sec6CessationTitle: "Kamatayan o Pagkawala ng Kakayahan ng May-ari, Pagsasara at Force Majeure",
    sec6CessationDesc: "Ang CreateMy-QR ay malayang binuo at pinamamahalaan. Sakaling maging imposible nang ituloy ang operasyon, o sa hindi inaasahang pagkakasakit, pagkawala ng kakayahan o pagpanaw ng may-ari, ang serbisyo ay maaaring permanenteng isara nang walang anumang pananagutang pinansyal o legal sa may-ari o sa kanyang mga tagapagmana.",
    sec6StaticGuaranteeTitle: "Permanenteng Kalayaan ng mga Nagawang Static QR Code",
    sec6StaticGuaranteeDesc: "Dahil ang CreateMy-QR ay 100% tumatakbo sa client-side gamit ang WebAssembly at direktang nag-e-encode ng data ayon sa ISO/IEC 18004 standard nang walang redirect server, ang bawat QR code, barcode, image (PNG/SVG), o sticker print na ginawa mo ay gagana magpakailanman. Kahit mawala o magsara ang website na ito balang araw, ang iyong mga naka-print na code ay hindi kailanman mag-e-expire."
  },
  bn: {
    lastUpdated: "সর্বশেষ আপডেট: নভেম্বর ২০২৬",
    sec6Title: "পরিষেবা ধারাবাহিকতা, 'লাইফটাইম' অ্যাক্সেসের সংজ্ঞা এবং অপ্রত্যাশিত কার্যক্রম সমাপ্তি",
    sec6LifetimeTitle: "'লাইফটাইম' অ্যাক্সেসের সংজ্ঞা",
    sec6LifetimeDesc: "'লাইফটাইম অ্যাক্সেস' বলতে বিশেষভাবে CreateMy-QR পরিষেবার বাণিজ্যিক এবং পরিচালনাগত জীবনকালকে বোঝায়, ক্রেতার জৈবিক আয়ু বা অনন্তকাল ধরে পরিষেবার অপরিবর্তনীয় গ্যারান্টি নয়। যদিও আমরা যথাসম্ভব দীর্ঘ সময় ধরে পরিষেবাটি চালু রাখার চেষ্টা করি, ডিজিটাল পণ্যসমূহ ইন্টারনেট পরিকাঠামো এবং ধারাবাহিক পরিচালনা যোগ্যতার ওপর নির্ভরশীল।",
    sec6CessationTitle: "প্রতিষ্ঠাতার অক্ষমতা, মৃত্যু, কার্যক্রম বন্ধ এবং দৈবদুর্বিপাক",
    sec6CessationDesc: "CreateMy-QR একটি স্বাধীনভাবে পরিচালিত সফটওয়্যার প্রকল্প। যদি পরিচালনা অসম্ভব হয়ে পড়ে, অথবা প্রতিষ্ঠাতার স্থায়ী অক্ষমতা বা মৃত্যু ঘটে, তবে পরিষেবাটি স্থায়ীভাবে বন্ধ হয়ে যেতে পারে। ব্যবহারকারীরা সম্মত হন যে এই পরিস্থিতিতে প্রতিষ্ঠাতা বা তাঁর উত্তরাধিকারীদের ওপর কোনো আর্থিক বা আইনি দায় বর্তাবে না।",
    sec6StaticGuaranteeTitle: "তৈরি করা স্ট্যাটিক কিউআর কোডের স্থায়ী স্বাধীনতা",
    sec6StaticGuaranteeDesc: "যেহেতু CreateMy-QR ওয়েবঅ্যাসেম্বলির মাধ্যমে ১০০% ক্লায়েন্ট-সাইডে কাজ করে এবং কোনো রিডাইরেক্ট সার্ভার ছাড়াই সরাসরি ISO/IEC 18004 মান অনুযায়ী ডেটা এনকোড করে, তাই আপনার তৈরি ও ডাউনলোড করা প্রতিটি কিউআর কোড, বারকোড, ছবি (PNG/SVG) বা প্রিন্ট করা স্টিকার চিরকাল কার্যকর থাকবে। ভবিষ্যতে এই ওয়েবসাইটটি বন্ধ হয়ে গেলেও আপনার মুদ্রিত কোডগুলি কখনোই অকেজো হবে না।"
  },
  el: {
    lastUpdated: "Τελευταία Ενημέρωση: Νοέμβριος 2026",
    sec6Title: "Συνέχεια Υπηρεσίας, Ορισμός Πρόσβασης 'Lifetime' και Απρόβλεπτη Διακοπή Λειτουργίας",
    sec6LifetimeTitle: "Ορισμός Πρόσβασης 'Lifetime'",
    sec6LifetimeDesc: "Η 'Πρόσβαση Lifetime' αναφέρεται ρητά στην εμπορική και λειτουργική διάρκεια ζωής της υπηρεσίας CreateMy-QR, και όχι στη βιολογική διάρκεια ζωής του αγοραστή ούτε αποτελεί εγγύηση αιωνιότητας. Παρότι καταβάλλουμε κάθε δυνατή προσπάθεια για τη διατήρηση της πλατφόρμας, τα ψηφιακά προϊόντα εξαρτώνται από τις υποδομές διαδικτύου και τη λειτουργική βιωσιμότητα.",
    sec6CessationTitle: "Ανικανότητα Ιδρυτή, Παύση Λειτουργίας και Ανωτέρα Βία",
    sec6CessationDesc: "Το CreateMy-QR είναι ανεξάρτητο λογισμικό. Σε περίπτωση που η λειτουργία καταστεί μη βιώσιμη, ή σε περίπτωση ανικανότητας, σοβαρής ασθένειας ή θανάτου του ιδρυτή, η πλατφόρμα μπορεί να κλείσει οριστικά. Οι χρήστες συμφωνούν ότι καμία οικονομική ή νομική ευθύνη δεν μεταβιβάζεται στον ιδρυτή ή τους κληρονόμους του.",
    sec6StaticGuaranteeTitle: "Μόνιμη Ανεξαρτησία των Δημιουργημένων Στατικών Κωδικών QR",
    sec6StaticGuaranteeDesc: "Επειδή το CreateMy-QR λειτουργεί 100% στην πλευρά του πελάτη μέσω WebAssembly και κωδικοποιεί δεδομένα απευθείας κατά το πρότυπο ISO/IEC 18004 χωρίς ενδιάμεσους διακομιστές ανακατεύθυνσης, κάθε κωδικός QR, γραμμωτός κώδικας, εικόνα (PNG/SVG) ή εκτυπωμένο φύλλο που εξάγετε θα λειτουργεί για πάντα. Ακόμη και αν αυτός ο ιστότοπος κλείσει στο μέλλον, οι εκτυπωμένοι κωδικοί σας δεν θα λήξουν ποτέ."
  },
  cs: {
    lastUpdated: "Poslední aktualizace: Listopad 2026",
    sec6Title: "Kontinuita Služby, Rozsah 'Doživotního' Přístupu a Nepředvídané Ukončení Provozu",
    sec6LifetimeTitle: "Definice 'Doživotního' Přístupu",
    sec6LifetimeDesc: "'Doživotní přístup' se výslovně vztahuje k provozní a komerční životnosti samotné služby CreateMy-QR, nikoli k biologickému věku kupujícího ani k neomezené záruce věčnosti. Ačkoli usilujeme o co nejdelší provozování platformy, digitální nástroje podléhají internetové infrastruktuře a možnostem údržby.",
    sec6CessationTitle: "Nezpůsobilost Zakladatele, Úmrtí, Ukončení Provozu a Vyšší Moc",
    sec6CessationDesc: "CreateMy-QR je nezávisle spravovaný software. Pokud se provoz stane neudržitelným, nebo v případě trvalé nezpůsobilosti či úmrtí zakladatele, může být služba trvale ukončena. Uživatelé výslovně souhlasí, že v takovém případě nevzniká žádná finanční ani právní odpovědnost vůči zakladateli či jeho dědicům.",
    sec6StaticGuaranteeTitle: "Trvalá Nezávislost Vygenerovaných Statických QR Kódů",
    sec6StaticGuaranteeDesc: "Vzhledem k tomu, že CreateMy-QR funguje 100% na straně klienta pomocí WebAssembly a kóduje data přímo podle standardu ISO/IEC 18004 bez přesměrovacích serverů, každý vygenerovaný QR kód, čárový kód, obrázek (PNG/SVG) či vytištěný arch bude navždy funkční. I kdyby tento web v budoucnu zanikl, vaše vytištěné kódy nikdy nepřestanou fungovat."
  },
  da: {
    lastUpdated: "Sidst opdateret: November 2026",
    sec6Title: "Tjenestekontinuitet, 'Lifetime' Adgang og Uforudset Driftsophør",
    sec6LifetimeTitle: "Definition af 'Lifetime' Adgang",
    sec6LifetimeDesc: "'Lifetime Adgang' refererer specifikt til den kommercielle og operationelle levetid for CreateMy-QR-tjenesten, ikke til købers biologiske levetid eller en evighedsgaranti. Selvom vi bestræber os på at holde platformen kørende så længe som muligt, afhænger digitale værktøjer af internetinfrastruktur og driftsmæssig levedygtighed.",
    sec6CessationTitle: "Grundlæggers Forfald, Driftsophør og Force Majeure",
    sec6CessationDesc: "CreateMy-QR er et uafhængigt udviklet projekt. Hvis driften ikke længere er mulig, eller i tilfælde af grundlæggerens permanente uarbejdsdygtighed eller død, kan tjenesten lukkes permanent. Brugere accepterer, at der ikke kan rejses økonomiske eller juridiske krav mod grundlæggeren eller dennes arvinger.",
    sec6StaticGuaranteeTitle: "Permanent Uafhængighed for Genererede Statiske QR-koder",
    sec6StaticGuaranteeDesc: "Eftersom CreateMy-QR kører 100% på klientsiden via WebAssembly og koder data direkte efter ISO/IEC 18004-standarden uden omdirigeringsservere, vil enhver eksporteret QR-kode, stregkode, billede (PNG/SVG) eller printet etiket fungere for evigt. Selv hvis dette websted lukker i fremtiden, vil dine trykte koder aldrig udløbe."
  },
  fi: {
    lastUpdated: "Viimeksi päivitetty: Marraskuu 2026",
    sec6Title: "Palvelun Jatkuvuus, 'Elinikäisen' Pääsyn Määritelmä ja Odottamaton Toiminnan Lopettaminen",
    sec6LifetimeTitle: "'Elinikäisen' Pääsyn Määritelmä",
    sec6LifetimeDesc: "'Elinikäinen pääsy' viittaa nimenomaan CreateMy-QR-palvelun kaupalliseen ja toiminnalliseen elinkaareen, ei ostajan biologiseen elinikään tai ikuiseen takuuseen. Vaikka pyrimme pitämään alustan verkossa mahdollisimman pitkään, digitaaliset palvelut ovat riippuvaisia verkkoinfrastruktuurista ja toiminnan jatkuvuudesta.",
    sec6CessationTitle: "Perustajan Toimintakyvyttömyys, Kuolema ja Ylivoimainen Este",
    sec6CessationDesc: "CreateMy-QR on itsenäisesti ylläpidetty ohjelmisto. Mikäli ylläpito käy mahdottomaksi tai perustaja kohtaa pysyvän toimintakyvyttömyyden tai kuoleman, palvelu voidaan sulkea pysyvästi. Käyttäjät hyväksyvät, ettei perustajalle tai tämän perillisille koidu tällaisissa tilanteissa taloudellista tai oikeudellista vastuuta.",
    sec6StaticGuaranteeTitle: "Luotujen Staattisten QR-koodien Pysyvä Riippumattomuus",
    sec6StaticGuaranteeDesc: "Koska CreateMy-QR toimii 100-prosenttisesti selaimessa WebAssemblyn avulla ja koodaa tiedot suoraan ISO/IEC 18004 -standardin mukaisesti ilman uudelleenohjauspalvelimia, jokainen viety QR-koodi, viivakoodi, kuva (PNG/SVG) tai tulostettu arkki toimii ikuisesti. Vaikka tämä sivusto suljettaisiin tulevaisuudessa, tulostetut koodisi eivät koskaan vanhene."
  },
  no: {
    lastUpdated: "Sist oppdatert: November 2026",
    sec6Title: "Tjenestekontinuitet, 'Lifetime'-tilgang og Uforutsett Driftsstans",
    sec6LifetimeTitle: "Definisjon av 'Lifetime'-tilgang",
    sec6LifetimeDesc: "'Lifetime-tilgang' refererer spesifikt til den kommersielle og operasjonelle levetiden til CreateMy-QR-tjenesten, ikke kjøperens biologiske levetid eller en garanti om evig drift. Selv om vi streber etter å holde tjenesten aktiv så lenge som overhodet mulig, er digitale verktøy avhengige av internettinfrastruktur og driftsmessig bærekraft.",
    sec6CessationTitle: "Grunnleggerens Bortfall, Driftsstans og Force Majeure",
    sec6CessationDesc: "CreateMy-QR er et uavhengig programvareprosjekt. Dersom videre drift blir umulig, eller i tilfelle grunnleggerens varige uførhet eller død, kan tjenesten avsluttes permanent. Brukere godtar at det i slike situasjoner ikke foreligger noe personlig eller økonomisk erstatningsansvar overfor grunnleggeren eller arvinger.",
    sec6StaticGuaranteeTitle: "Permanent Uavhengighet for Genererte Statiske QR-koder",
    sec6StaticGuaranteeDesc: "Siden CreateMy-QR kjører 100 % på klientsiden via WebAssembly og koder data direkte etter ISO/IEC 18004-standarden uten omdirigeringsservere, vil alle eksporterte QR-koder, strekkoder, bilder (PNG/SVG) eller utskrevne etiketter fungere for alltid. Selv om denne nettsiden skulle opphøre i fremtiden, vil dine trykte koder aldri slutte å virke."
  },
  sv: {
    lastUpdated: "Senast uppdaterad: November 2026",
    sec6Title: "Tjänstekontinuitet, 'Livstidsåtkomst' och Oförutsett Driftsavbrott",
    sec6LifetimeTitle: "Definition av 'Livstidsåtkomst'",
    sec6LifetimeDesc: "'Livstidsåtkomst' avser specifikt den kommersiella och operativa livslängden för tjänsten CreateMy-QR, inte köparens biologiska livslängd eller en evighetsgaranti. Även om vår avsikt är att hålla plattformen igång så länge som möjligt, är digitala produkter beroende av internetinfrastruktur och driftsmässig genomförbarhet.",
    sec6CessationTitle: "Grundarens Förhinder, Avveckling och Force Majeure",
    sec6CessationDesc: "CreateMy-QR är ett oberoende mjukvaruprojekt. Om driften blir omöjlig eller vid grundarens permanenta arbetsoförmåga eller frånfälle kan tjänsten stängas permanent. Användare godkänner att inga ekonomiska eller juridiska anspråk kan riktas mot grundaren eller dennes arvingar.",
    sec6StaticGuaranteeTitle: "Permanent Oberoende för Genererade Statiska QR-koder",
    sec6StaticGuaranteeDesc: "Eftersom CreateMy-QR körs 100% på klientsidan via WebAssembly och kodar data direkt enligt ISO/IEC 18004-standarden utan omdirigeringsservrar, kommer varje exporterad QR-kod, streckkod, bild (PNG/SVG) eller utskriven etikett att fungera för alltid. Även om denna webbplats skulle stängas i framtiden kommer dina tryckta koder aldrig att sluta fungera."
  },
  hu: {
    lastUpdated: "Utoljára frissítve: 2026. november",
    sec6Title: "A Szolgáltatás Folytonossága, az 'Élethosszig Tartó' Hozzáférés Hatálya és a Működés Váratlan Megszűnése",
    sec6LifetimeTitle: "Az 'Élethosszig Tartó' Hozzáférés Meghatározása",
    sec6LifetimeDesc: "Az 'Élethosszig tartó hozzáférés' kifejezetten a CreateMy-QR szolgáltatás működési és piaci élettartamára vonatkozik, nem pedig a vásárló biológiai élettartamára vagy egy korlátlan örökkévalósági garanciára. Bár törekszünk az oldal lehető leghosszabb üzemeltetésére, a digitális eszközök függenek az internetes infrastruktúrától és a fenntarthatóságtól.",
    sec6CessationTitle: "Az Alapító Cselekvőképtelensége, Halála, Megszűnés és Vis Maior",
    sec6CessationDesc: "A CreateMy-QR függetlenül fenntartott szoftver. Amennyiben az üzemeltetés ellehetetlenül, vagy az alapító tartós cselekvőképtelensége, súlyos betegsége vagy halála következik be, a szolgáltatás véglegesen leállhat. A felhasználók elfogadják, hogy ilyen esetben semmilyen anyagi kártérítési felelősség nem hárítható az alapítóra vagy örököseire.",
    sec6StaticGuaranteeTitle: "A Létrehozott Statikus QR-kódok Végleges Függetlensége",
    sec6StaticGuaranteeDesc: "Mivel a CreateMy-QR 100%-ban kliensoldalon fut a WebAssembly segítségével, és az adatokat közvetlenül az ISO/IEC 18004 szabvány szerint kódolja átirányító szerverek nélkül, minden exportált QR-kód, vonalkód, képfájl (PNG/SVG) vagy nyomtatott matrica örökre működőképes marad. Még ha ez a weboldal a jövőben meg is szűnne, a kinyomtatott kódjai soha nem járnak le."
  },
  ro: {
    lastUpdated: "Ultima actualizare: Noiembrie 2026",
    sec6Title: "Continuitatea Serviciului, Domeniul Accesului 'Pe Viață' și Încetarea Neanticipată a Activității",
    sec6LifetimeTitle: "Definirea Accesului 'Pe Viață' (Lifetime)",
    sec6LifetimeDesc: "'Accesul pe Viață' se referă strict la durata de funcționare comercială și operațională a serviciului CreateMy-QR, nu la durata biologică a cumpărătorului și nici la o garanție nelimitată de veșnicie. Deși depunem toate eforturile pentru a menține platforma activă cât mai mult timp, produsele digitale depind de infrastructura web și de sustenabilitatea operațională.",
    sec6CessationTitle: "Incapacitatea Fondatorului, Decesul, Încetarea Activității și Forța Majoră",
    sec6CessationDesc: "CreateMy-QR este un proiect software independent. În cazul în care menținerea operațiunilor devine imposibilă, sau în caz de incapacitate permanentă ori deces al fondatorului, platforma poate fi închisă definitiv. Utilizatorii acceptă că nicio răspundere financiară sau juridică nu revine fondatorului sau moștenitorilor acestuia.",
    sec6StaticGuaranteeTitle: "Independența Permanentă a Codurilor QR Statice Generate",
    sec6StaticGuaranteeDesc: "Deoarece CreateMy-QR funcționează 100% pe partea de client prin WebAssembly și codifică direct datele conform standardului ISO/IEC 18004 fără servere intermediare de redirecționare, fiecare cod QR, cod de bare, imagine (PNG/SVG) sau coală tipărită va funcționa pentru totdeauna. Chiar dacă acest site s-ar închide în viitor, codurile dvs. imprimate nu vor expira niciodată."
  },
  uk: {
    lastUpdated: "Останнє оновлення: Листопад 2026",
    sec6Title: "Безперервність сервісу, довічний доступ ('Lifetime') та непередбачене припинення роботи",
    sec6LifetimeTitle: "Визначення довічного доступу ('Lifetime')",
    sec6LifetimeDesc: "«Довічний доступ» (Lifetime) стосується виключно періоду комерційної та технічної експлуатації сервісу CreateMy-QR, а не біологічного віку покупця чи абсолютної гарантії вічності. Ми прагнемо підтримувати сервіс якомога довше, проте цифрові продукти залежать від інфраструктури мережі та операційної доцільності.",
    sec6CessationTitle: "Форс-мажор, недієздатність засновника та припинення діяльності",
    sec6CessationDesc: "CreateMy-QR — незалежний проєкт. У разі неможливості підтримки сервісу, важкої хвороби, втрати дієздатності або смерті засновника сервіс може бути закритий. Користувачі погоджуються, що за таких обставин творець або його спадкоємці не несуть жодних фінансових зобов'язань щодо повернення коштів.",
    sec6StaticGuaranteeTitle: "Повна автономність створених статичних QR-кодів",
    sec6StaticGuaranteeDesc: "Оскільки CreateMy-QR працює на 100% на стороні клієнта за допомогою WebAssembly і кодує дані безпосередньо за стандартом ISO/IEC 18004 без проміжних серверів перенаправлення, кожен експортований QR-код, штрих-код, файл (PNG/SVG) чи роздрукований аркуш працюватиме вічно. Навіть якщо цей сайт перестане функціонувати, ваші надруковані коди ніколи не втратять чинності."
  }
};

function updateTosInLocale(filePath, lang) {
  if (!fs.existsSync(filePath)) {
    console.warn(`File not found: ${filePath}`);
    return;
  }

  const content = fs.readFileSync(filePath, 'utf8');
  const json = JSON.parse(content);
  const dict = TOS_TRANSLATIONS[lang] || TOS_TRANSLATIONS.en;

  if (!json.static) json.static = {};
  if (!json.static.terms) json.static.terms = {};

  json.static.terms.lastUpdated = dict.lastUpdated;
  json.static.terms.sec6Title = dict.sec6Title;
  json.static.terms.sec6LifetimeTitle = dict.sec6LifetimeTitle;
  json.static.terms.sec6LifetimeDesc = dict.sec6LifetimeDesc;
  json.static.terms.sec6CessationTitle = dict.sec6CessationTitle;
  json.static.terms.sec6CessationDesc = dict.sec6CessationDesc;
  json.static.terms.sec6StaticGuaranteeTitle = dict.sec6StaticGuaranteeTitle;
  json.static.terms.sec6StaticGuaranteeDesc = dict.sec6StaticGuaranteeDesc;

  fs.writeFileSync(filePath, JSON.stringify(json, null, 2) + '\n', 'utf8');
  console.log(`Updated TOS clause in: ${filePath} (${lang})`);
}

// 1. Update public/locales for all 30 languages
const localesDir = path.join(__dirname, '..', 'public', 'locales');
const languages = fs.readdirSync(localesDir);

for (const lang of languages) {
  const filePath = path.join(localesDir, lang, 'translation.json');
  updateTosInLocale(filePath, lang);
}

// 2. Also update src/locales/en/translation.json
const srcEnPath = path.join(__dirname, '..', 'src', 'locales', 'en', 'translation.json');
updateTosInLocale(srcEnPath, 'en');

console.log('Successfully added Section 6 clause across all 30 languages!');
